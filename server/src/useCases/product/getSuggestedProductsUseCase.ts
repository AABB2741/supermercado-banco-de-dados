import { prisma } from "../../prisma";

export async function getSuggestedProductsUseCase(
	userId: number,
	search: string = ""
) {
	// Pega todos os produtos que o usuário já comprou/usou
	// Retorna o promise para o transaction em getProductsUseCase.
	return [];
}
