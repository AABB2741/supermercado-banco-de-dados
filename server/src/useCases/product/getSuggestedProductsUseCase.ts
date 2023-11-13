import { prisma } from "../../prisma";

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

	// Pega todas as vezes que o usuario gastou um produto
	// TODO: Arrumar, está pegando de TODOS os produtos
	const consumption = [];

	for (let i = 0; i < history.length; i++) {
		if (i === 0) continue;

		const h = history[i];

		const difference = h.amount - history[i - 1].amount;

		if (difference > 0) {
			consumption.push(h);
		}
	}

	console.log(consumption);

	return [];
}
