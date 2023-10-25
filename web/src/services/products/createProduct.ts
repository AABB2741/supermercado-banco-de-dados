import { api } from "../../api/api";

import { ProductProps } from "../../@types/product-props";

export async function createProduct(name: string) {
    const { data } = await api.post<ProductProps>("/products/create", { name });
    return data;
}
