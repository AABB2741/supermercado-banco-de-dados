import { api } from "../../api/api";

import { ListItemProps } from "../../@types/list-item-props";

interface EditItemProps {
    id: number;
    checked?: boolean;
}

export async function editItem({ id, ...props }: EditItemProps) {
    const { data } = await api.put<ListItemProps>(
        "/lists/items/edit/" + id,
        props,
    );
    return data;
}
