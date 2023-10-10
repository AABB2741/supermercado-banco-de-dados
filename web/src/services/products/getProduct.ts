import { wait } from "../../utils/wait";

import { products } from "../../tests/products.test";
import { AppError } from "../../errors/AppError";

export async function getProduct(productId: number) {
    await wait(1000);

    const product = products.find((p) => p.id === productId);

    if (!product) throw new AppError("unknown_error");

    return product;
}
