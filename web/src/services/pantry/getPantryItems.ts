import { CancelToken } from "axios";

import { api } from "../../api/api";

import { PantryItemProps } from "../../@types/pantry-item-props";

export async function getPantryItems(cancelToken: CancelToken) {
    const { data } = await api.get<PantryItemProps[]>("/pantry/items", {
        cancelToken,
    });

    return data;
}
