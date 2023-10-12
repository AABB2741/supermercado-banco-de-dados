import { prisma } from "../../prisma";

interface EditListItemProps {
	id: number;
	checked?: boolean;
}

export async function editListItemUseCase({ id, ...data }: EditListItemProps) {
	const listItem = await prisma.listItem.update({
		where: {
			id,
		},
		data,
	});

	return listItem;
}
