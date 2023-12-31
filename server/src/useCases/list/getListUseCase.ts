import { prisma } from "../../prisma";

interface GetListProps {
	userId: number;
	listId: number;
}

export async function getListUseCase({ userId, listId }: GetListProps) {
	const list = await prisma.list.findUniqueOrThrow({
		where: {
			id: listId,
			userId,
		},
		include: {
			_count: true,
			user: {
				select: {
					name: true,
				},
			},
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	return list;
}
