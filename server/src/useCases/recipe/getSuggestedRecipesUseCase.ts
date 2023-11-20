import { prisma } from "../../prisma";

/** Obtém todas as receitas nas quais o usuário possui todos os ingredientes */
export async function getSuggestedRecipesUseCase(userId: number) {
	const userIngredients = await prisma.pantryItem.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			productId: true,
		},
	});

	if (userIngredients.length === 0) return [];

	const suggestions = await prisma.recipe.findMany({
		where: {
			ingredients: {
				every: {
					productId: {
						in: userIngredients.map(
							(ingredient) => ingredient.productId
						),
					},
				},
			},
		},
	});

	return suggestions;
}
