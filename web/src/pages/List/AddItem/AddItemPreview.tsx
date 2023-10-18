import { useEffect } from "react";

import { useAddItem } from "./AddItemRoot";

// import { getProduct } from "../../../services/products/getProduct";
import { defaultProducts } from "../../../data/defaultProducts";

import banner from "../../../assets/list-banner.jpg";

export function AddItemPreview() {
    const { product, preview, setPreview } = useAddItem();

    useEffect(() => {
        if (!product) return;

        console.log("Procurando produto", product);

        if (product.isOffline) {
            const res = defaultProducts.find((p) => p.id === product.id);

            if (res) {
                setPreview(res);
            }
        }
    }, [product, setPreview]);

    if (!product || !preview) return null;

    return (
        <>
            <p className="mt-4 text-lg font-bold">Sobre este produto</p>
            <div className="mt-2 flex gap-4">
                {!product.isOffline && (
                    <img src={banner} className="h-14 w-14 rounded-lg" />
                )}
                <div className="flex-1">
                    <p className="text-xl font-bold">{preview.name}</p>
                    {/* {product?.user && <p>Vendido por: {product.user.name}</p>}
                    {product?.brand && <p>Marca: {product.brand.name}</p>}
                    {product?.dueTime && (
                        <p>Vence em {product.dueTime} dias (11/10/2023)</p>
                    )}
                    {typeof product?.price === "number" && (
                        <p>
                            Unidade: R$
                            {product.price.toFixed(2).replace(".", ",")}
                        </p>
                    )} */}
                </div>
            </div>
        </>
    );
}
