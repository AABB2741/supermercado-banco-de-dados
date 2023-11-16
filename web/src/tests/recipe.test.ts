import { RecipeProps } from "../@types/recipe-props";

import boloDeCenoura from "../assets/recipes/bolo-de-cenoura.jpeg";

export const recipeTest: RecipeProps = {
    id: 1,
    thumbnail: boloDeCenoura,
    name: "Bolo de cenoura",
    description:
        "Confira como fazer essa receita de bolo de cenoura simples e fácil, nossa campeã de acessos! Uma receita prática, feita com auxílio do liquidificador e perfeita para o café da manhã e para a hora do lanche!",
    createdAt: new Date(),
    ingredientPortion: 8,
    userId: 1,
    user: {
        id: 1,
        createdAt: new Date(),
        name: "RPB Shopping",
        email: "shopping@rpbcompany.com.br",
    },
    ingredients: [],
    preparation: [
        {
            id: 1,
            step: 1,
            title: "Massa",
            content:
                "Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture.",
            recipeId: 1,
        },
        {
            id: 2,
            step: 2,
            content: "Acrescente o açúcar e bata novamente por 5 minutos.",
            recipeId: 1,
        },
        {
            id: 3,
            step: 3,
            content:
                "Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente.",
            recipeId: 1,
        },
        {
            id: 4,
            step: 4,
            content:
                "Acrescente o fermento e misture lentamente com uma colher.",
            recipeId: 1,
        },
        {
            id: 5,
            step: 5,
            content:
                "Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos.",
            recipeId: 1,
        },
        {
            id: 6,
            step: 6,
            title: "Cobertura",
            content:
                "Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture.",
            recipeId: 1,
        },
        {
            id: 7,
            step: 7,
            content:
                "Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo.",
            recipeId: 1,
        },
    ],
};
