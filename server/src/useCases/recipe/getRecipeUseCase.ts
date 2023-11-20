import { prisma } from "../../prisma";

export async function getRecipeUseCase(recipeId: number, userId: number) {
	const recipe = await prisma.recipe.findUniqueOrThrow({
		where: {
			id: recipeId,
		},
		include: {
			ingredients: {
				include: {
					product: true,
				},
			},
			preparation: true,
			user: true,
		},
	});

	const userHas = await prisma.$transaction(
		recipe.ingredients.map((ingredient) =>
			prisma.pantryItem.findFirst({
				where: {
					userId,
					productId: ingredient.productId,
				},
				select: {
					productId: true,
					amount: true,
					id: true,
				},
			})
		)
	);

	return {
		...recipe,
		ingredients: recipe.ingredients.map((ingredient) => {
			const index = userHas.findIndex(
				(h) => h?.productId === ingredient.productId
			);
			return {
				...ingredient,
				has: index !== -1 ? userHas[index]?.amount ?? 0 : 0,
			};
		}),
	};
}
