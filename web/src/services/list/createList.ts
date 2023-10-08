import z from "zod";
import { api } from "../../api/api";

import { ListProps } from "../../@types/createList";

export async function createList(props: Pick<ListProps, "name" | "color">) {
    const dataSchema = z.object({
        name: z.string().min(1).max(100),
        color: z.string(),
    });

    const listData = dataSchema.parse(props);

    const { data } = await api.post<{ id: number }>("/lists/create", listData);
    return data.id;
}
