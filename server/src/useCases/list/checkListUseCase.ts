import { prisma } from "../../prisma";
import { addPantryItemUseCase } from "../pantry/addPantryItemUseCase";

export async function checkListUseCase(id: number) {
	// Atualiza o estado da lista para concluído
	const { user, items, ...list } = await prisma.list.update({
		data: {
			checked: true,
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
		},
	});

	// Adiciona todos os itens da lista à despensa
	for (const item of items) {
		if (item.checked) {
			await addPantryItemUseCase({ userId: user.id, ...item });
			console.log(
				`Adicionando x${item.amount} de ${
					item.offlineProductId ?? item.productId
				} para ${user.name}`
			);
		}
	}

	return list;
}
