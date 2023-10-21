import { prisma } from "../../prisma";

interface EditPantryItemProps {
	id: number;
	userId: number;
}

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
