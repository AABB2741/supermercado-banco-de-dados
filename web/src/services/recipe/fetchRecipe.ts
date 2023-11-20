import { CancelToken } from "axios";

import { api } from "../../api/api";
import { RecipeProps } from "../../@types/recipe-props";

export async function fetchRecipe(id: number, cancelToken: CancelToken) {
    const { data } = await api.get<RecipeProps>("/recipes/" + id, {
        cancelToken,
    });
    console.log(data);
    return data;
}
