import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

import { getSuggestedProductsUseCase } from "./getSuggestedProductsUseCase";

/**
 * Sem transaction:
 * 4.805ms
 * 8.725ms
 * 6.132ms
 *
 * Com transaction:
 * 10.611ms
 * 2.578ms
 * 4.027ms
 */

export async function getProductsUseCase(userId: number, search: string = "") {
	console.time("produtos");
	const findBasic = prisma.product.findMany({
		where: {
			name: {
				contains: normalize(search).toLowerCase(),
			},
			public: true,
		},
		orderBy: {
			name: "asc",
		},
		take: 5,
	});

	const findCustom = prisma.product.findMany({
		where: {
			userId,
		},
		orderBy: {
			name: "asc",
		},
		take: 3,
	});

	const res = await prisma.$transaction([findBasic, findCustom]);

	const suggested = await getSuggestedProductsUseCase(userId, search);

	console.timeEnd("produtos");

	return {
		basic: res[0],
		custom: res[1],
		suggested,
	};
}
