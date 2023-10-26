import { PantryItem } from "@prisma/client";

import { prisma } from "../../prisma";

type AddPantryItemProps = Omit<PantryItem, "id">;

export async function addPantryItemUseCase(data: AddPantryItemProps) {
	const itemExists = await prisma.pantryItem.findFirst({
		where: {
			productId: data.productId,
			userId: data.userId,
		},
	});

	if (itemExists) {
		const item = await prisma.pantryItem.update({
			where: {
				id: itemExists.id,
			},
			data: {
				amount: {
					increment: data.amount,
				},
			},
		});

		return item;
	} else {
		const item = await prisma.pantryItem.create({
			data,
		});

		return item;
	}
}
