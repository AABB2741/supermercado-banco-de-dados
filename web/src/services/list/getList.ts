import { CancelToken } from "axios";

import { api } from "../../api/api";

import { ListProps } from "../../@types/list-props";

export async function getList(id: number, cancelToken: CancelToken) {
    const list = await api.get<ListProps>("/lists/" + id, { cancelToken });
    return list.data;
}
