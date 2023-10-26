import { api } from "../../api/api";

import { PantryItemProps } from "../../@types/pantry-item-props";

interface AddPantryItemProps {
    amount: number;
    productId?: number;
}

export async function addPantryItem(props: AddPantryItemProps) {
    const pantryItem = await api.post<PantryItemProps>("/pantry/add", props);
    return pantryItem.data;
}
