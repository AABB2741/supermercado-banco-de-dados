import { api } from "../../api/api";

import { ListProps } from "../../@types/list-props";

export async function checkList(id: number) {
    const { data } = await api.put<ListProps>("/lists/check/" + id);
    return data;
}
