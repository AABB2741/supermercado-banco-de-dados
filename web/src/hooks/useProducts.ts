import { useState } from "react";
import { useDebounce } from "./useDebounce";

import { ProductProps } from "../@types/product-props";
import { getProducts } from "../services/products/getProducts";

// TODO: Adicionar userProducts (produtos personalizados)
export function useProducts(search: string) {
    const [products, setProducts] = useState<{
        basic: ProductProps[];
        custom: ProductProps[];
        suggested: ProductProps[];
    }>({ basic: [], custom: [], suggested: [] });

    useDebounce(
        () => {
            getProducts(search).then((res) => {
                setProducts(res);
            });
        },
        1000,
        [search],
    );

    return products;
}
