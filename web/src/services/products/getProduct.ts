import { api } from "../../api/api";

import { ProductPreview } from "../../pages/List/AddItem/AddItemRoot";

export async function getProduct(id: number) {
    const { data } = await api.get<ProductPreview>("/products/" + id);
    return data;
}
