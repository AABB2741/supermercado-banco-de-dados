import { prisma } from "../../prisma";

export async function getSuggestedProductsUseCase(
	userId: number,
	search: string = ""
) {
	// Pega todos os produtos que o usuário já comprou/usou
	const products = await prisma.product.findMany({
		where: {
			OR: [
				{
					name: {
						contains: search,
					},
					public: true,
				},
				{
					name: {
						contains: search,
					},
					userId,
				},
			],
		},
		orderBy: {
			name: "asc",
		},
		take: 3,
	});

	return products;
}
