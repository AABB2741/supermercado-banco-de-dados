import { api } from "../../api/api";

import { CancelToken } from "axios";
import { ListProps } from "../../@types/createList";

export async function getLists(cancelToken: CancelToken) {
    const { data } = await api.get<ListProps[]>("/lists", { cancelToken });
    return data;
}
