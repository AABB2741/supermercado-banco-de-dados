import { useMemo } from "react";

import { defaultProducts } from "../data/defaultProducts";
import { normalize } from "../utils/normalize";

import { ProductProps } from "../@types/product-props";

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
    const localProducts = useMemo(
        () =>
            defaultProducts
                .filter((p) => normalize(p.name).toLowerCase().includes(search))
                .sort((a, b) => sort(a, b, search))
                .slice(0, 5),
        [search],
    );

    return {
        localProducts,
    };
}
