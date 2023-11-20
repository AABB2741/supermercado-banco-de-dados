import { prisma } from "../../prisma";
import { getSuggestedRecipesUseCase } from "./getSuggestedRecipesUseCase";

export async function getRecipesUseCase(userId: number) {
	const recipes = await prisma.recipe.findMany({
		include: {
			user: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	const suggested = await getSuggestedRecipesUseCase(userId);

	return {
		recipes,
		suggested,
	};
}
