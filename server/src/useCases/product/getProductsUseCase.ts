import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

import { getSuggestedProductsUseCase } from "./getSuggestedProductsUseCase";

export async function getProductsUseCase(userId: number, search: string = "") {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: normalize(search).toLowerCase(),
			},
			public: true,
		},
		orderBy: {
			name: "asc",
		},
		take: 10,
	});

	const suggested = await getSuggestedProductsUseCase(userId);

	return {
		basic: products,
		suggested: products,
	};
}
