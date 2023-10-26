import { ProductProps } from "./product-props";

export type PantryItemProps = {
    id: number;
    amount: number;

    productId: number;
    product: ProductProps;

    userId: number;
};
