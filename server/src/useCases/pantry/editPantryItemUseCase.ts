import { PantryItem } from "@prisma/client";

import { prisma } from "../../prisma";

type EditPantryItemProps = {
	id: number;
	userId: number;
} & Partial<Omit<PantryItem, "productId">>;

export async function editPantryItemUseCase({
	id,
	userId,
	...data
}: EditPantryItemProps) {
	const editedItem = await prisma.pantryItem.update({
		where: {
			id,
			userId,
		},
		data,
		include: {
			product: true,
		},
	});

	await prisma.pantryHistory.create({
		data: {
			userId,
			productId: editedItem.productId,
			amount: editedItem.amount,
		},
	});

	return editedItem;
}
