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
	});

	return editedItem;
}
