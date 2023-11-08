import { prisma } from "../../prisma";
import { addPantryItemUseCase } from "../pantry/addPantryItemUseCase";

export async function toggleListUseCase(id: number) {
	const { checked } = await prisma.list.findUniqueOrThrow({
		where: {
			id,
		},
		select: {
			checked: true,
		},
	});
	// Desmarca todos os itens da lista
	if (checked) {
		await prisma.listItem.updateMany({
			where: {
				listId: id,
			},
			data: {
				checked: false,
			},
		});
	}
	// Atualiza o estado da lista para concluído
	const { user, items, ...list } = await prisma.list.update({
		data: {
			checked: !checked,
			checkedAt: new Date(),
		},
		where: {
			id,
		},
		include: {
			_count: true,
			user: {
				select: {
					name: true,
					id: true,
				},
			},
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	if (list.checked) {
		// Adicionar itens à despensa
		for (const item of items) {
			if (item.checked) {
				await addPantryItemUseCase({
					userId: user.id,
					amount: item.amount,
					productId: item.productId,
				});
			}
		}
	}

	return { ...list, items };
}
