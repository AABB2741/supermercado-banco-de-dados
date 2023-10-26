import { ListItemProps } from "../../@types/list-item-props";
import { api } from "../../api/api";

interface AddItemProps {
    listId: number;
    productId?: number;
    amount: number;
}

export async function addItem({ listId, ...props }: AddItemProps) {
    const { data } = await api.post<ListItemProps>(
        "/lists/add/" + listId,
        props,
    );

    return data;
}
