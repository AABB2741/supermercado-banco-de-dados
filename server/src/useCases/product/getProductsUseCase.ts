import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

import { getSuggestedProductsUseCase } from "./getSuggestedProductsUseCase";

export async function getProductsUseCase(userId: number, search: string = "") {
	const basic = await prisma.product.findMany({
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

	const custom = await prisma.product.findMany({
		where: {
			userId,
		},
		orderBy: {
			name: "asc",
		},
		take: 3,
	});

	const suggested = await getSuggestedProductsUseCase(
		userId,
		normalize(search).toLowerCase()
	);

	return {
		basic,
		custom,
		suggested,
	};
}
