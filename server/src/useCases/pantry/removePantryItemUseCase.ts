import { prisma } from "../../prisma";

type RemovePantryItemProps = {
	userId: number;
	id: number;
};

export async function removePantryItemUseCase(where: RemovePantryItemProps) {
	const removedItem = await prisma.pantryItem.delete({
		where,
	});

	return removedItem;
}
