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

	// Verificando se o item já está adicionado na lista
	const item = await prisma.listItem.findFirst({
		where: {
			productId: data.productId,
			listId,
		},
	});

	if (item) {
		const res = await prisma.listItem.update({
			where: {
				id: item.id,
			},
			data: {
				amount: {
					increment: data.amount,
				},
			},
			select: {
				list: {
					include: {
						items: {
							include: {
								product: true,
							},
						},
						user: true,
					},
				},
			},
		});
		return res.list;
	} else {
		const res = await prisma.listItem.create({
			data: {
				...data,
				listId,
			},
			select: {
				list: {
					include: {
						items: {
							include: {
								product: true,
							},
						},
						user: true,
					},
				},
			},
		});

		return res.list;
	}
}
