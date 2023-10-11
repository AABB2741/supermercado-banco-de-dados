import { api } from "../../api/api";

import { normalize } from "../../utils/normalize";

import { ProductProps } from "../../@types/product-props";

export type GetProductsProps = {
    suggested: ProductProps[];
    public: ProductProps[];
};

export async function getProducts(
    search: string = "",
): Promise<GetProductsProps> {
    const { data } = await api.get<GetProductsProps>(
        "/products/recommended/" + encodeURI(normalize(search)),
    );
    return data;
}
