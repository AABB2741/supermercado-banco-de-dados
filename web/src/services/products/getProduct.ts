import { api } from "../../api/api";

import { ProductProps } from "../../@types/product-props";

export async function getProduct(id: number) {
    const { data } = await api.get<ProductProps>("/products/" + id);
    return data;
}
