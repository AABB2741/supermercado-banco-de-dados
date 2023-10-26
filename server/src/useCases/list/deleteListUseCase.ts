import { prisma } from "../../prisma";

type DeleteListProps = {
	id: number;
	userId: number;
};

export async function deleteListUseCase({ id, userId }: DeleteListProps) {
	const isValid = await prisma.list.findUniqueOrThrow({
		where: {
			id,
			userId,
		},
	});

	await prisma.listItem.deleteMany({
		where: {
			listId: id,
		},
	});

	const deletedList = await prisma.list.delete({
		where: {
			id,
			userId,
		},
	});

	return deletedList;
}
