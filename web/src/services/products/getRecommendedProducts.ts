import { api } from "../../api/api";

type RecommendedProduct = {
    id: number;
    name: string;
    isOffline: boolean;
};

export async function getRecommendedProducts(search: string) {
    const recommendedProducts = await api.get(
        "/products/recommended/" + encodeURI(search),
    );
}
