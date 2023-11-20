import { CancelToken } from "axios";

import { wait } from "../../utils/wait";
import { api } from "../../api/api";

export async function fetchRecipe(id: number, cancelToken: CancelToken) {
    await wait(1000);
    const recipe = await api.get("/recipes/" + id, { cancelToken });
    return recipe;
}
