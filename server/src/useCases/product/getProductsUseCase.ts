import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

import { getSuggestedProductsUseCase } from "./getSuggestedProductsUseCase";

export async function getProductsUseCase(userId: number, search: string = "") {
	const products = await prisma.product.findMany({
		where: {
			OR: [
				{
					name: {
						contains: normalize(search).toLowerCase(),
					},
					public: true,
				},
				{
					name: {
						contains: normalize(search).toLowerCase(),
					},
					userId,
				},
			],
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
