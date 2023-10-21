import { prisma } from "../../prisma";

export async function getListsUseCase(userId: number) {
	const lists = await prisma.list.findMany({
		where: {
			userId,
		},
		include: {
			items: {
				take: 2,
				select: {
					id: true,
					isOffline: true,
					offlineProductId: true,
					product: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			},
		},
	});

	return lists;
}
