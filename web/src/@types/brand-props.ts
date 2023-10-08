import { UserProps } from "../redux/slices/userSlice";
import { ProductProps } from "./product-props";

export type BrandProps = {
    id: number;
    name: string;
    user: UserProps;
    userId: number;
    products?: ProductProps;
};
