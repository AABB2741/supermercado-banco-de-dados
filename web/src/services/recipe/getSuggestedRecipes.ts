import { CancelToken } from "axios";

import { api } from "../../api/api";

export type SuggestedRecipe = {
    id: number;
    name: string;
    description: string;
    thumbnail?: string;
    user: {
        id: number;
        name: string;
    };
};

export async function getSuggestedRecipes(cancelToken: CancelToken) {
    const { data } = await api.get<SuggestedRecipe[]>("/recipes/suggested", {
        cancelToken,
    });
    return data;
}
