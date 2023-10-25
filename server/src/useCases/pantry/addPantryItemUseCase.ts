import { prisma } from "../../prisma";

interface AddPantryItemProps {
	isOffline: boolean;
	productId?: number | null;
	offlineProductId?: number | null;
	userId: number;
	amount: number;
}

export async function addPantryItemUseCase(data: AddPantryItemProps) {
	const itemExists = await prisma.pantryItem.findFirst({
		where: {
			isOffline: data.isOffline,
			offlineProductId: data.offlineProductId,
			productId: data.productId,
			userId: data.userId,
		},
	});

	if (itemExists) {
		const item = await prisma.pantryItem.update({
			where: {
				id: itemExists.id,
			},
			data: {
				amount: {
					increment: data.amount,
				},
			},
		});

		return item;
	} else {
		const item = await prisma.pantryItem.create({
			data,
		});

		return item;
	}
}
