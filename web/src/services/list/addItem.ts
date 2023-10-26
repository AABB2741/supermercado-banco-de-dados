import { api } from "../../api/api";

import { ListProps } from "../../@types/list-props";

interface AddItemProps {
    listId: number;
    productId: number;
    amount: number;
}

export async function addItem({ listId, ...props }: AddItemProps) {
    const { data } = await api.post<ListProps>("/lists/add/" + listId, props);

    return data;
}
