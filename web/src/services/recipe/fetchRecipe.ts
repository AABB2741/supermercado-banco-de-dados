import { CancelToken } from "axios";

import { recipeTest } from "../../tests/recipe.test";
import { wait } from "../../utils/wait";

export async function fetchRecipe(id: number, cancelToken: CancelToken) {
    await wait(1000);
    const recipe = recipeTest;
    return recipe;
}
