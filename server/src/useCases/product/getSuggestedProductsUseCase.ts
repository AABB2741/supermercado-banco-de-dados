import { PantryHistory, Product } from "@prisma/client";
import { prisma } from "../../prisma";

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

	for (const group of groupedHistory) {
		const purchaseHistory: Date[] = [];

		for (const i in group.history) {
			if (i == "0") continue;

			const prev = group.history[parseInt(i) - 1];
			const curr = group.history[i];

			// Esse IF verifica se o item foi comprado (se foi adicionado uma quantia)
			if (curr.amount - prev.amount > 0) {
				purchaseHistory.push(curr.createdAt);
			}
		}

		console.log(
			`Datas em que o produto ${
				group.product.name
			} foi comprado: ${purchaseHistory.join(", ")}`
		);
	}

	return [];
}
