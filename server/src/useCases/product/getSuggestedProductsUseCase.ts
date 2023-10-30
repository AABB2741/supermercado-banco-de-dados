import { prisma } from "../../prisma";

export async function getSuggestedProductsUseCase(userId: number) {
	// Pega todos os produtos que o usuário já comprou/usou
	const products = await prisma.pantryHistory.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			createdAt: true,
		},
	});
}
