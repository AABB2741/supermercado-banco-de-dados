import { ListProps } from "./list-props";
import { ProductProps } from "./product-props";

export type ListItemProps = {
    id: number;
    checked: boolean;
    amount: number;

    list?: ListProps;
    listId: number;

    product: ProductProps;
    productId: number;
};
