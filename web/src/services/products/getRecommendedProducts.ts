import { api } from "../../api/api";

type RecommendedProduct = {
    id: number;
    name: string;
};

export async function getRecommendedProducts(search: string) {
    const recommendedProducts = await api.get<RecommendedProduct[]>(
        "/products/recommended/" + encodeURI(search),
    );
}
