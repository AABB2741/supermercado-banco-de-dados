import { Ingredient, Preparation, Recipe } from "@prisma/client";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type RecipeProps = Omit<Recipe, "id" | "createdAt">;
type PreparationProps = PartialBy<Omit<Preparation, "id">, "title">;
type IngredientProps = Omit<Ingredient, "id">;

export const recipes: RecipeProps[] = [
	{
		name: "Bolo de cenoura",
		description:
			"Confira como fazer essa receita de bolo de cenoura simples e fácil, nossa campeã de acessos! Uma receita prática, feita com auxílio do liquidificador e perfeita para o café da manhã e para a hora do lanche!",
		ingredientPortion: 8,
		userId: 1,
	},
];
export const ingredients: IngredientProps[] = [
	{
		amount: 0.5,
		productId: 40, // Óleo de cozinha
		recipeId: 1,
	},
	{
		amount: 4,
		productId: 50, // Ovos
		recipeId: 1,
	},
	{
		amount: 2.5,
		productId: 26, // Farinha de trigo
		recipeId: 1,
	},
	{
		amount: 3,
		productId: 139, // Cenoura
		recipeId: 1,
	},
	{
		amount: 2,
		productId: 49, // Açúcar
		recipeId: 1,
	},
	{
		amount: 1,
		productId: 39, // Fermento em pó
		recipeId: 1,
	},
];

export const preparation: PreparationProps[] = [
	{
		step: 1,
		title: "Massa",
		content:
			"Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.",
		recipeId: 1,
	},
	{
		step: 2,
		content: "Acrescente o açúcar e bata novamente por 5 minutos.",
		recipeId: 1,
	},
	{
		step: 3,
		content:
			"Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.",
		recipeId: 1,
	},
	{
		step: 4,
		content: "Acrescente o fermento e misture lentamente com uma colher.",
		recipeId: 1,
	},
	{
		step: 5,
		content:
			"Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.",
		recipeId: 1,
	},
	{
		step: 6,
		title: "Cobertura",
		content:
			"Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture.",
		recipeId: 1,
	},
	{
		step: 7,
		content:
			"Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo.",
		recipeId: 1,
	},
];
