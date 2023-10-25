import { ListProps } from "../../@types/list-props";
import { api } from "../../api/api";

export async function toggleList(id: number) {
    const { data } = await api.put<ListProps>("/lists/toggle/" + id);
    return data;
}
