import { prisma } from "../../prisma";

import { getSuggestedProductsUseCase } from "./getSuggestedProductsUseCase";

export async function getSuggestionsUseCase(userId: number, listId: number) {
	const { items } = await prisma.list.findUniqueOrThrow({
		select: {
			items: {
				distinct: "productId",
				select: {
					productId: true,
				},
			},
		},
		where: {
			id: listId,
			userId,
		},
	});
	console.log(items);
	const suggestions = await getSuggestedProductsUseCase(
		userId,
		"",
		items.map((p) => p.productId)
	);
	return suggestions;
}
