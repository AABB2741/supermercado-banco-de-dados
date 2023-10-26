import { api } from "../../api/api";

import { ProductProps } from "../../@types/product-props";

export async function getProducts(search: string) {
    const { data } = await api.get<{
        basic: ProductProps[];
        suggested: ProductProps[];
    }>("/products/get/" + encodeURI(search));
    return data;
}
