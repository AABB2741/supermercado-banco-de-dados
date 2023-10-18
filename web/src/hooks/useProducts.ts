import { useMemo } from "react";

import { defaultProducts } from "../data/defaultProducts";
import { normalize } from "../utils/normalize";

// TODO: Adicionar userProducts (produtos personalizados)
export function useProducts(search: string) {
    const localProducts = useMemo(
        () =>
            defaultProducts.filter((p) =>
                normalize(p.name).toLowerCase().includes(search),
            ),
        [search],
    );

    return {
        localProducts,
    };
}
