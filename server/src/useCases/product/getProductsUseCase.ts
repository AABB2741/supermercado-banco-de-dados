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
	console.time("Tempo para carregar lista de sugestões + lista de produtos");
	const findBasic = prisma.product.findMany({
		select: {
			id: true,
			name: true,
			brand: true,
			price: true,
		},
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
		select: {
			id: true,
			name: true,
			brand: true,
			price: true,
		},
		where: {
			userId,
			name: {
				contains: normalize(search).toLowerCase(),
			},
		},
		orderBy: {
			name: "asc",
		},
		take: 3,
	});

	const res = await prisma.$transaction([findBasic, findCustom]);
	console.log("Pesquisa", normalize(search).toLowerCase());
	console.log(
		"Lista de produtos básicos:",
		res[0].map((p) => p.name)
	);
	console.log(
		"Lista de produtos personalizados:",
		res[1].map((p) => p.name)
	);
	console.time("Tempo para carregar lista de sugestões");
	const suggested = await getSuggestedProductsUseCase(userId, search);
	console.timeEnd("Tempo para carregar lista de sugestões");

	console.timeEnd(
		"Tempo para carregar lista de sugestões + lista de produtos"
	);

	return {
		basic: res[0],
		custom: res[1],
		suggested,
	};
}
