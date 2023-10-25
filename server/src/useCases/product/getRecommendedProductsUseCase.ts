import { prisma } from "../../prisma";

export async function getRecommendedProductsUseCase() {
	const products = await prisma.product.findMany({
		take: 3,
	});

	return products;
}
