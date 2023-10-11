import { normalize } from "../../utils/normalize";
import { wait } from "../../utils/wait";

import { ProductProps } from "../../@types/product-props";

import { products } from "../../tests/products.test";

export type GetProductsProps = {
    suggested: ProductProps[];
    branded: ProductProps[];
    all: ProductProps[];
};

export async function getProducts(
    search: string = "",
): Promise<GetProductsProps> {
    await wait(1000);
    return {
        suggested: products
            .filter((p) =>
                normalize(p.name)
                    .toLowerCase()
                    .includes(normalize(search).toLowerCase()),
            )
            .slice(0, 3),
        branded: products
            .filter(
                (p) =>
                    normalize(p.name)
                        .toLowerCase()
                        .includes(normalize(search).toLowerCase()) ||
                    (p.brand &&
                        normalize(p.brand.name).includes(
                            normalize(search).toLowerCase(),
                        )),
            )
            .slice(0, 5),
        all: products
            .filter((p) =>
                normalize(p.name)
                    .toLowerCase()
                    .includes(normalize(search).toLowerCase()),
            )
            .slice(0, 20),
    };
}
