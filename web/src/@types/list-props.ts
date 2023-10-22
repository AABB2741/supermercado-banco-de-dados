import { ListItemProps } from "./list-item-props";
import { UserProps } from "./user-props";

export type ListProps = {
    id: number;
    name: string;
    color: string;
    due?: Date;
    createdAt: Date;
    checked: boolean;

    items?: ListItemProps[];

    user?: UserProps;
    userId: number;

    _count: {
        items: number;
    };
};
