import { usePantryAdd } from "./PantryAddRoot";

import banner from "../../../../assets/list-banner.jpg";

export function PantryAddPreview() {
    const { product } = usePantryAdd();

    if (!product) return null;

    return (
        <>
            <p className="mt-4 text-lg font-bold">Sobre este produto</p>
            <div className="mt-2 flex items-center gap-4">
                {!product.isOffline && (
                    <img src={banner} className="h-14 w-14 rounded-lg" />
                )}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                    {product.name[0]}
                </span>
                <div className="flex-1">
                    <p className="text-xl font-bold">{product.name}</p>
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
