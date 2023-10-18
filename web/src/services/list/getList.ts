import { CancelToken } from "axios";

import { api } from "../../api/api";

import { ListProps } from "../../@types/list-props";

import { defaultProducts } from "../../data/defaultProducts";

export async function getList(id: number, cancelToken: CancelToken) {
    const list = await api.get<ListProps>("/lists/" + id, { cancelToken });
    const res = list.data;

    for (let i in res.items ?? []) {
        if (res.items && res.items[i].isOffline) {
            let item = res.items[i];
            res.items[i].product = defaultProducts.find(
                (p) => item.offlineProductId === p.id,
            );
        }
    }
    console.log(res.items);

    return res;
}
