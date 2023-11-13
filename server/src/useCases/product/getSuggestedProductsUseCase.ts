import { PantryHistory, Product } from "@prisma/client";
import { prisma } from "../../prisma";

type GroupHistoryProps = {
	product: Product;
} & PantryHistory;

export async function getSuggestedProductsUseCase(
	userId: number,
	search: string = ""
) {
	// Pega todos os produtos que o usuário já comprou/usou
	// Retorna o promise para o transaction em getProductsUseCase.

	const history = await prisma.pantryHistory.findMany({
		where: {
			userId,
		},
		include: {
			product: true,
		},
		orderBy: {
			id: "asc",
		},
	});

	return [];
}
