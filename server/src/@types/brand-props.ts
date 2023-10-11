import { ProductProps } from "./product-props";
import { UserProps } from "./user-props";

export type BrandProps = {
    id: number;
    name: string;

    user?: UserProps;
    userId: number;

    products?: ProductProps[];
};
