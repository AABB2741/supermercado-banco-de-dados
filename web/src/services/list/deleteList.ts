import { ListProps } from "../../@types/list-props";
import { api } from "../../api/api";

export async function deleteList(id: number) {
    const { data } = await api.delete<ListProps>("/lists/delete/" + id);
    return data;
}
