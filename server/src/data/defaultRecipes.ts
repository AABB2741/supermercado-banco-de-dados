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
	{
		name: "Pudim de leite condensado",
		description:
			"Veja como fazer essa receita de pudim de leite condensado lisinho e com uma calda perfeita de caramelo. Ele é delicioso, barato e bem rápido de preparar! Com sua textura macia e sabor inconfundível, esse doce é uma verdadeira tentação para os amantes de sobremesas tradicionais. Fácil de preparar e com ingredientes simples, o pudim é uma opção perfeita para adoçar qualquer ocasião especial. Com uma preparação simples, envolvendo poucos ingredientes como leite condensado, leite, ovos e açúcar para a calda, você pode criar uma sobremesa que vai encantar todos os paladares. Surpreenda sua família e amigos com esse clássico da culinária, que além de delicioso, possui uma apresentação encantadora. Siga o passo a passo desta receita e mergulhe nessa experiência de sabores que certamente vai conquistar a todos.",
		ingredientPortion: 8,
		userId: 1,
	},
	{
		name: "Mingau de aveia (básico mas delicioso)",
		description:
			"Comece o seu dia com uma receita de mingau de aveia básico, porém irresistível! Aprenda essa receita simples e transforme suas manhãs em momentos deliciosos e saudáveis.",
		ingredientPortion: 1,
		userId: 1,
	},
	{
		name: "Brigadeiro",
		description:
			"Ninguém resiste a essa receita de brigadeiro: ele é o rei das festas de aniversário e é impossível comer um só. Veja agora mesmo como fazer essa delícia de forma simples e prática.",
		ingredientPortion: 30,
		userId: 1,
	},
	{
		name: "Sorvete de chocolate",
		description: "Aprenda a fazer um delicioso sorvete de chocolate",
		ingredientPortion: 5,
		userId: 1,
	},
	{
		name: "Banana empanada",
		description: "Banana empanada 😋",
		ingredientPortion: 6,
		userId: 1,
	},
];
export const ingredients: IngredientProps[] = [
	// Bolo de cenoura
	{
		amount: 0.5,
		productId: 43, // Óleo de cozinha
		recipeId: 1,
	},
	{
		amount: 4,
		productId: 55, // Ovos
		recipeId: 1,
	},
	{
		amount: 2.5,
		productId: 29, // Farinha de trigo
		recipeId: 1,
	},
	{
		amount: 3,
		productId: 145, // Cenoura
		recipeId: 1,
	},
	{
		amount: 2,
		productId: 53, // Açúcar
		recipeId: 1,
	},
	{
		amount: 1,
		productId: 42, // Fermento em pó
		recipeId: 1,
	},
	// Pudim de leite condensado
	{
		amount: 1,
		productId: 47, // Leite condensado
		recipeId: 2,
	},
	{
		amount: 3,
		productId: 55, // Ovos
		recipeId: 2,
	},
	{
		amount: 1,
		productId: 61, // Leite
		recipeId: 2,
	},
	{
		amount: 1,
		productId: 53, // Açúcar
		recipeId: 2,
	},
	{
		amount: 1.5,
		productId: 60, // Água
		recipeId: 2,
	},
	// Mingau de aveia
	{
		amount: 2,
		productId: 62, // Leite integral
		recipeId: 3,
	},
	{
		amount: 5,
		productId: 25, // Aveia em flocos
		recipeId: 3,
	},
	{
		amount: 3,
		productId: 53, // Açúcar
		recipeId: 3,
	},
	{
		amount: 1,
		productId: 54, // Canela
		recipeId: 3,
	},
	// Brigadeiro
	{
		amount: 1,
		productId: 47, // Leite condensado
		recipeId: 4,
	},
	{
		amount: 7,
		productId: 5, // Achocolatado em pó
		recipeId: 4,
	},
	{
		amount: 1,
		productId: 16, // Margarina
		recipeId: 4,
	},
	{
		amount: 1,
		productId: 8, // Chocolate granulado
		recipeId: 4,
	},
	// Sorvete de chocolate
	{
		amount: 1,
		productId: 47, // Leite condensado
		recipeId: 5,
	},
	{
		amount: 1.5,
		productId: 61, // Leite
		recipeId: 5,
	},
	{
		amount: 1,
		productId: 7, // Chocolate meio amargo
		recipeId: 5,
	},
	// Banana empanada
	{
		amount: 1,
		productId: 127, // Banana
		recipeId: 6,
	},
	{
		amount: 1,
		productId: 29, // Farinha de trigo
		recipeId: 6,
	},
	{
		amount: 1,
		productId: 44, // Óleo de milho
		recipeId: 6,
	},
	{
		amount: 1,
		productId: 55, // Ovos
		recipeId: 6,
	},
	{
		amount: 1,
		productId: 40, // Farinha de rosca
		recipeId: 6,
	},
];

export const preparation: PreparationProps[] = [
	// Bolo de cenoura
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
	// Pudim de leite condensado
	{
		step: 1,
		title: "Pudim",
		content: "Primeiro, bata bem os ovos no liquidificador.",
		recipeId: 2,
	},
	{
		step: 2,
		content: "Acrescente o leite condensado e o leite, e bata novamente.",
		recipeId: 2,
	},
	{
		step: 3,
		title: "Calda",
		content:
			"Derreta o açúcar na panela até ficar moreno, acrescente a água e deixe engrossar.",
		recipeId: 2,
	},
	{
		step: 4,
		content:
			"Coloque em uma forma redonda e despeje a massa do pudim por cima.",
		recipeId: 2,
	},
	{
		step: 5,
		content:
			"Asse em forno médio por 45 minutos, com a assadeira redonda dentro de uma maior com água.",
		recipeId: 2,
	},
	{
		step: 6,
		content: "Espete um garfo para ver se está bem assado.",
		recipeId: 2,
	},
	{
		step: 7,
		content: "Deixe esfriar e desenforme.",
		recipeId: 2,
	},
	// Mingau de aveia
	{
		step: 1,
		content:
			"Em um copo americano coloque a aveia, o açúcar e um pouco de leite, mexa e reserve.",
		recipeId: 3,
	},
	{
		step: 2,
		content:
			"Ferva o restante do leite em uma panela e quando começar a levantar fervura coloque a mistura que você reservou.",
		recipeId: 3,
	},
	{
		step: 3,
		content:
			"Aguarde até começar a quase grudar na panela, mexendo sempre em fogo baixo e está pronto.",
		recipeId: 3,
	},
	{
		step: 4,
		content: "Coloque canela por cima para polvilhar e bom apetite.",
		recipeId: 3,
	},
	// Brigadeiro
	{
		step: 1,
		content:
			"Em uma panela funda, acrescente o leite condensado, a margarina e o chocolate em pó.",
		recipeId: 4,
	},
	{
		step: 2,
		content:
			"Cozinhe em fogo médio e mexa até que o brigadeiro comece a desgrudar da panela.",
		recipeId: 4,
	},
	{
		step: 3,
		content:
			"Deixe esfriar e faça pequenas bolas com a mão passando a massa no chocolate granulado.",
		recipeId: 4,
	},
	// Sorvete de chocolate
	{
		step: 1,
		content:
			"Dissolva o chocolate no leite quente. Em seguida, adicione o leite condensado e bata no liquidificador.",
		recipeId: 5,
	},
	{
		step: 3,
		content: "Leve ao congelador ou freezer e espere cerca de 3 horas.",
		recipeId: 5,
	},
	// Banana empanada
	{
		step: 1,
		content: "Descasque as bananas e tire os fios.",
		recipeId: 6,
	},
	{
		step: 2,
		content: "Corte-as ao meio.",
		recipeId: 6,
	},
	{
		step: 3,
		content: "Passe na farinha de trigo e tire o excesso.",
		recipeId: 6,
	},
	{
		step: 4,
		content: "Passe nos ovos levemente batidos, escorra e tire o excesso.",
		recipeId: 6,
	},
	{
		step: 5,
		content: "Em seguida, passe na farinha de rosca.",
		recipeId: 6,
	},
	{
		step: 6,
		content: "Frite em óleo não muito quente.",
		recipeId: 6,
	},
	{
		step: 7,
		content: "Retire com um garfo e escorra em papel toalha.",
		recipeId: 6,
	},
	{
		step: 8,
		content: "Fica macia por dentro, crocante por fora e muito saborosa.",
		recipeId: 6,
	},
];
