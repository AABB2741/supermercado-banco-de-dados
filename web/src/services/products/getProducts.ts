import { products } from "../../tests/products.test";
import { normalize } from "../../utils/normalize";

import { wait } from "../../utils/wait";

export async function getProducts(search?: string) {
    await wait(1000);
    return search
        ? products
              .filter((p) =>
                  normalize(p.name)
                      .toLowerCase()
                      .includes(normalize(search).toLowerCase()),
              )
              .sort((a, b) => (a.name > b.name ? 1 : -1))
        : products;
}
