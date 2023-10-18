import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma";

interface AddListItemProps {
	amount?: number;
	isOffline?: boolean;
	listId: number;
	productId?: number;
	offlineProductId?: number;
	userId: number;
}

export async function addListItemUseCase({
	userId,
	listId,
	...data
}: AddListItemProps) {
	// This code checks if the user is owner of the list that is receiving a item
	try {
		const isUserOwner = await prisma.list.findUniqueOrThrow({
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
		select: {
			product: true,
		},
	});

	return listItem;
}
