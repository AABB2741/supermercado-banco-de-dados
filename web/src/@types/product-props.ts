import { ListProps } from "./list-props";
import { UserProps } from "./user-props";

export type ProductProps = {
    id: number;
    name: string;
    price?: number;
    dueTime?: number;

    lists?: ListProps[];

    brand?: string;

    user?: UserProps;
    userId?: number;
};
