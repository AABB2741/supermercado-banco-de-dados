import { CancelToken } from "axios";

import { api } from "../../api/api";
import { defaultProducts } from "../../data/defaultProducts";

import { PantryItemProps } from "../../@types/pantry-item-props";
import { ProductProps } from "../../@types/product-props";

export type PantryItem = PantryItemProps & {
    product: ProductProps;
};

export async function getPantryItems(cancelToken: CancelToken) {
    const { data } = await api.get<PantryItem[]>("/pantry/items", {
        cancelToken,
    });
    const res: PantryItem[] = [];

    for (const item of data) {
        if (item.isOffline) {
            const foundItem = defaultProducts.find(
                (p) => p.id === item.offlineProductId,
            );

            if (foundItem) res.push({ ...item, product: foundItem });
        } else res.push(item);
    }

    return res;
}
