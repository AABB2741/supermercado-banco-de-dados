import { prisma } from "../../prisma";

interface AddPantryItemProps {
	isOffline: boolean;
	productId?: number;
	offlineProductId?: number;
	userId: number;
	amount: number;
}

export async function addPantryItemUseCase(data: AddPantryItemProps) {
	const item = await prisma.pantryItem.create({
		data,
	});

	return item;
}
