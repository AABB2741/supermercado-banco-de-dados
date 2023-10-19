import { CancelToken } from "axios";

import { api } from "../../api/api";

import { ListProps } from "../../@types/list-props";

import { defaultProducts } from "../../data/defaultProducts";

export async function getList(id: number, cancelToken: CancelToken) {
    const list = await api.get<ListProps>("/lists/" + id, { cancelToken });
    const res = list.data;

    for (const i in res.items ?? []) {
        if (res.items && res.items[i].isOffline) {
            const item = res.items[i];
            res.items[i].product = defaultProducts.find(
                (p) => item.offlineProductId === p.id,
            );
            console.log("Obtendo item", item);
        }
    }

    return res;
}
