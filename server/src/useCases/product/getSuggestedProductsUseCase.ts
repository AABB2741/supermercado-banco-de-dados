import { prisma } from "../../prisma";

import { PantryHistory, Product } from "@prisma/client";

type GroupHistoryProps = {
	product: Product;
} & PantryHistory;

type GroupProps = {
	productId: number;
	product: Product;
	history: {
		id: number;
		amount: number;
		createdAt: Date;
	}[];
	purchaseAvgInterval?: number; // Intervalo médio de tempo para comprar um certo produo
};

function groupHistory(history: GroupHistoryProps[], search: string = "") {
	const groups: GroupProps[] = [];

	for (const h of history) {
		const index = groups.findIndex((g) => g.productId === h.productId);

		if (index !== -1) {
			groups[index].history.push({
				id: h.id,
				amount: h.amount,
				createdAt: h.createdAt,
			});
		} else {
			groups.push({
				productId: h.productId,
				product: h.product,
				history: [
					{
						id: h.id,
						amount: h.amount,
						createdAt: h.createdAt,
					},
				],
			});
		}
	}

	return groups;
}

export async function getSuggestedProductsUseCase(
	userId: number,
	search: string = ""
) {
	// Pega todos os produtos que o usuário já comprou/usou

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

	const groupedHistory = groupHistory(history, search);

	for (const g in groupedHistory) {
		const group = groupedHistory[g];
		const purchaseHistory: Date[] = [];

		if (group.history.length < 3) continue;

		for (const i in group.history) {
			if (i == "0") {
				purchaseHistory.push(group.history[i].createdAt);
				continue;
			}

			const prev = group.history[parseInt(i) - 1];
			const curr = group.history[i];

			// Esse IF verifica se o item foi comprado (se foi adicionado uma quantia)
			if (curr.amount - prev.amount > 0) {
				purchaseHistory.push(curr.createdAt);
			}
		}

		// Diferenças entre os tempos de compra
		const purchaseDiff = [];

		for (const i in purchaseHistory) {
			if (i == "0") continue;

			const prev = purchaseHistory[parseInt(i) - 1];
			const curr = purchaseHistory[i];

			// Obtém a diferença de tempo
			purchaseDiff.push(Math.abs(curr.getTime() - prev.getTime()));
		}
		console.log(purchaseDiff);
		const purchaseAvgInterval = purchaseDiff.reduce(
			(prev, curr, index) => (prev + curr) / (index === 0 ? 1 : 2),
			0
		);
		groupedHistory[g].purchaseAvgInterval = purchaseAvgInterval;
	}

	groupedHistory.forEach((group) => {
		console.log(
			`Próximo ${group.product.name} será comprado em ${new Date(
				new Date(
					group.history[group.history.length - 1].createdAt
				).getTime() + (group.purchaseAvgInterval ?? 0)
			)}`
		);
	});

	const res = groupedHistory.filter(
		(group) =>
			group.history.length >= 3 &&
			new Date().getTime() >=
				new Date(
					group.history[group.history.length - 1].createdAt
				).getTime() +
					(group.purchaseAvgInterval ?? 0)
	);

	return [];
}
