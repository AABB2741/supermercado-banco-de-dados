import { api } from "../../api/api";

import { normalize } from "../../utils/normalize";

import { ProductProps } from "../../@types/product-props";

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

export async function getProducts(search: string) {
    const {
        data: { basic, suggested },
    } = await api.get<{
        basic: ProductProps[];
        suggested: ProductProps[];
    }>("/products/get/" + encodeURI(search));
    return {
        basic: basic.sort((a, b) => sort(a, b, search)),
        suggested: suggested.sort((a, b) => sort(a, b, search)),
    };
}
