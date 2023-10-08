import { prisma } from "../../prisma";

export async function GetListsUseCase(userId: number) {
	const lists = await prisma.list.findMany({
		where: {
			userId,
		},
	});

	return lists;
}
