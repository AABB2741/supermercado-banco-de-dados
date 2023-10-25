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
	// Atualiza o estado da lista para concluído
	const { user, items, ...list } = await prisma.list.update({
		data: {
			checked: !checked,
		},
		where: {
			id,
		},
		include: {
			user: true,
			items: {
				select: {
					id: true,
					isOffline: true,
					amount: true,
					offlineProductId: true,
					productId: true,
					checked: true,
				},
			},
			_count: true,
		},
	});

	if (list.checked) {
		// Adicionar itens à despensa
		for (const item of items) {
			if (item.checked) {
				await addPantryItemUseCase({
					userId: user.id,
					amount: item.amount,
					isOffline: item.isOffline,
					offlineProductId: item.offlineProductId,
					productId: item.productId,
				});
				console.log(
					`Adicionando x${item.amount} de ${
						item.offlineProductId ?? item.productId
					} para ${user.name}`
				);
			}
		}
	}

	return list;
}
