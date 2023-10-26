import { prisma } from "../../prisma";

export async function getPantryItemsUseCase(userId: number) {
	const pantryItems = await prisma.pantryItem.findMany({
		where: {
			userId,
		},
		include: {
			product: true,
		},
	});

	return pantryItems;
}
