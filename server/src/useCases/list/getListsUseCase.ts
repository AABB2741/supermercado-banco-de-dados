import { prisma } from "../../prisma";

export async function getListsUseCase(userId: number) {
	const lists = await prisma.list.findMany({
		where: {
			userId,
		},
	});

	return lists;
}
