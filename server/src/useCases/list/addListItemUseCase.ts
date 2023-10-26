import { ListItem } from "@prisma/client";

import { prisma } from "../../prisma";

import { AppError } from "../../errors/AppError";

type AddListItemProps = {
	userId: number;
} & Omit<ListItem, "id" | "checked">;

export async function addListItemUseCase({
	userId,
	listId,
	...data
}: AddListItemProps) {
	// This code checks if the user is owner of the list that is receiving a item
	try {
		await prisma.list.findUniqueOrThrow({
			where: {
				userId,
				id: listId,
			},
		});
	} catch (err) {
		throw new AppError("unauthorized", 401);
	}

	const listItem = await prisma.listItem.create({
		data: {
			...data,
			listId,
		},
	});

	return listItem;
}
