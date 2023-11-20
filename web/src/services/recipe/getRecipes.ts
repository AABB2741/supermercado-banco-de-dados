import { CancelToken } from "axios";
import { api } from "../../api/api";
import { RecipeProps } from "../../@types/recipe-props";
import { SuggestedRecipe } from "./getSuggestedRecipes";

export type RecipesData = {
    recipes: RecipeProps[];
    suggested: SuggestedRecipe[];
};

export async function getRecipes(cancelToken: CancelToken) {
    const { data } = await api.get<RecipesData>("/recipes", { cancelToken });
    return data;
}
