import { api } from "../../api/api";

import { PantryItemProps } from "../../@types/pantry-item-props";

export async function removePantryItem(id: number) {
    const { data } = await api.delete<PantryItemProps>("/pantry/remove/" + id);
    return data;
}
