export type ListProps = {
    id: number;
    name: string;
    color: string;
    due?: number;
    createdAt: Date;
    checked: boolean;
};

export async function createList() {}
