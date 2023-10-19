import { CancelToken } from "axios";
import { PantryItemProps } from "../../@types/pantry-item-props";
import { api } from "../../api/api";

export async function getPantryItems(cancelToken: CancelToken) {
    const res = await api.get<PantryItemProps[]>("/pantry/items", {
        cancelToken,
    });
    return res.data;
}
