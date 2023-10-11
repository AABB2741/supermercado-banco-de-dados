import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma";

interface AddListItemProps {
	amount?: number;
	listId: number;
	productId: number;
	userId: number;
}

export async function addListItemUseCase({
	userId,
	...data
}: AddListItemProps) {
	// This code checks if the user is owner of the list that is receiving a item
	try {
		const isUserOwner = await prisma.list.findUniqueOrThrow({
			where: {
				userId,
				id: data.listId,
			},
		});
	} catch (err) {
		throw new AppError("unauthorized", 401);
	}

	const listItem = await prisma.listItem.create({
		data,
	});

	return listItem;
}
