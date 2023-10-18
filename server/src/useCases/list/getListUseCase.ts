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
			user: true,
			items: {
				include: {
					product: true,
				},
			},
		},
	});
	console.log(list);
	return list;
}
