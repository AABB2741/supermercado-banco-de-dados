import { prisma } from "../../prisma";

type RemovePantryItemProps = {
	userId: number;
	id: number;
};

export async function removePantryItemUseCase(where: RemovePantryItemProps) {
	const removedItem = await prisma.pantryItem.delete({
		where,
	});

	await prisma.pantryHistory.create({
		data: {
			amount: 0,
			productId: removedItem.productId,
			userId: removedItem.userId,
		},
	});

	return removedItem;
}
