import { ListProps } from "./list-props";

export type UserProps = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;

    lists?: ListProps[];
};
