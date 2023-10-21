import { api } from "../../api/api";

import { PantryItemProps } from "../../@types/pantry-item-props";

export interface EditPantryItemProps {
    amount?: number;
}

export async function editPantryItem(id: number, data: EditPantryItemProps) {
    const item = await api.put<PantryItemProps>("/pantry/edit/" + id, data);
    return item.data;
}
