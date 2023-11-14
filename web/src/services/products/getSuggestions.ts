import { ProductProps } from "../../@types/product-props";
import { api } from "../../api/api";

export async function getSuggestions(listId: number) {
    const { data } = await api.get<ProductProps[]>("/products/suggestions/" + listId);
    console.log(data);
}
