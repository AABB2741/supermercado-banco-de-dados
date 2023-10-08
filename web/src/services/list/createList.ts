import z from "zod";
import { api } from "../../api/api";

export type ListProps = {
    id: number;
    name: string;
    color: string;
    due?: number;
    createdAt: Date;
    checked: boolean;
};

export async function createList(props: Pick<ListProps, "name" | "color">) {
    const dataSchema = z.object({
        name: z.string().min(1).max(100),
        color: z.string(),
    });

    const listData = dataSchema.parse(props);

    const { data } = await api.post<{ id: number }>("/lists/create", listData);
    return data.id;
}
