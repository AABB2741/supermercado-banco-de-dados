import { prisma } from "../../prisma";

export async function getSuggestionsUseCase(userId: number, listId: number) {
	const listProducts = await prisma.list.findUniqueOrThrow({
		select: {
			items: {
				select: {
					productId: true,
				},
			},
		},
		where: {
			id: listId,
			userId,
		},
	});

	console.log(listProducts);
}
