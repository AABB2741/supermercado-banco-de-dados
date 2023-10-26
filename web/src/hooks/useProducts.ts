import { useState } from "react";
import { useDebounce } from "./useDebounce";

import { normalize } from "../utils/normalize";

import { ProductProps } from "../@types/product-props";
import { getProducts } from "../services/products/getProducts";

function sort(a: ProductProps, b: ProductProps, search: string) {
    if (
        normalize(a.name).toLowerCase().startsWith(search) &&
        !normalize(b.name).toLowerCase().startsWith(search)
    ) {
        return -1;
    } else if (
        !normalize(a.name).toLowerCase().startsWith(search) &&
        normalize(b.name).toLowerCase().startsWith(search)
    ) {
        return 1;
    }

    return 0;
}

// TODO: Adicionar userProducts (produtos personalizados)
export function useProducts(search: string) {
    const [products, setProducts] = useState<{
        basic: ProductProps[];
        suggested: ProductProps[];
    }>({ basic: [], suggested: [] });

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
