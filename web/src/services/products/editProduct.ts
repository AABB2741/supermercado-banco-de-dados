import { api } from "../../api/api";

import { ProductProps } from "../../@types/product-props";

interface EditProductProps {
    price?: number;
    brand?: string;
}

export async function editProduct(productId: number, data: EditProductProps) {
    const response = await api.put<ProductProps>(
        "/products/edit/" + productId,
        data,
    );
    return response.data;
}
