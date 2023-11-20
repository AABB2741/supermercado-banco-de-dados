import { prisma } from "../../prisma";

import { normalize } from "../../utils/normalize";

type HistoryProps = {
	id: number;
	amount: number;
	createdAt: Date;
};

type GroupHistoryProps = {
	productId: number;
} & HistoryProps;

type GroupProps = {
	productId: number;
	history: HistoryProps[];
	purchaseHistory?: Date[];
	purchaseAvgInterval?: number; // Intervalo médio de tempo para comprar um certo produo
};

function groupHistory(history: GroupHistoryProps[]) {
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
	search: string = "",
	prohibitedIDs: number[] = []
) {
	// Pega todos os produtos que o usuário já comprou/usou

	const history = await prisma.pantryHistory.findMany({
		select: {
			id: true,
			productId: true,
			createdAt: true,
			amount: true,
		},
		where: {
			userId,
			NOT: {
				productId: {
					in: prohibitedIDs,
				},
			},
		},
		orderBy: {
			id: "asc",
		},
	});

	const groupedHistory = groupHistory(history);

	for (const g in groupedHistory) {
		const group = groupedHistory[g];
		const purchaseHistory: Date[] = [];

		if (group.history.length < 3) continue;

		for (const i in group.history) {
			if (i == "0") {
				const createdDate = new Date(group.history[i].createdAt);
				createdDate.setHours(0, 0, 0, 0);
				purchaseHistory.push(createdDate);
				continue;
			}

			const prev = group.history[parseInt(i) - 1];
			const curr = group.history[i];

			// Esse IF verifica se o item foi comprado (se foi adicionado uma quantia)
			if (curr.amount - prev.amount > 0) {
				const currentDate = new Date(curr.createdAt);
				currentDate.setHours(0, 0, 0, 0);
				purchaseHistory.push(currentDate);
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

		const purchaseAvgInterval = purchaseDiff.reduce(
			(prev, curr, index) => (prev + curr) / (index === 0 ? 1 : 2),
			0
		);

		groupedHistory[g].purchaseHistory = purchaseHistory;
		groupedHistory[g].purchaseAvgInterval = purchaseAvgInterval;
	}

	const final = groupedHistory.filter(
		(group) => {
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			const time = date;

			const lastPurchase =
				group.purchaseHistory?.[group.purchaseHistory.length - 1] ??
				new Date();
			const nextPurchase = new Date(
				lastPurchase.getTime() + (group.purchaseAvgInterval ?? 0)
			);
			nextPurchase.setHours(0, 0, 0, 0);

			return (
				group.purchaseHistory &&
				group.purchaseHistory?.length >= 3 &&
				time.getTime() >= nextPurchase.getTime()
			);
		}
		// (group) =>
		// 	group.history.length >= 3 &&
		// 	new Date().getTime() >=
		// 		new Date(
		// 			group.history[group.history.length - 1].createdAt
		// 		).getTime() +
		// 			(group.purchaseAvgInterval ?? 0)
	);

	const products = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			brand: true,
			price: true,
		},
		where: {
			id: {
				in: final.map((f) => f.productId),
			},
			name: {
				contains: normalize(search).toLowerCase(),
			},
		},
	});

	return products;
}
