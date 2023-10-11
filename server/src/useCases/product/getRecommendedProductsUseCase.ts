import { prisma } from "../../prisma";

export async function getRecommendedProductsUseCase(search: string = "") {
	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: search,
			},
		},
	});

	return products;
}
