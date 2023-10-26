import { prisma } from "../../prisma";

export async function getListsUseCase(userId: number) {
	const lists = await prisma.list.findMany({
		where: {
			userId,
		},
		include: {
			items: {
				take: 3,
				select: {
					id: true,
					product: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
			_count: true,
		},
	});

	return lists;
}
