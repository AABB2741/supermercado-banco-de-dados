import { prisma } from "../../prisma";

interface RemovePantryItemProps {
	userId: number;
	id: number;
}

export async function removePantryItemUseCase(where: RemovePantryItemProps) {
	const removedItem = await prisma.pantryItem.delete({
		where,
	});

	return removedItem;
}
