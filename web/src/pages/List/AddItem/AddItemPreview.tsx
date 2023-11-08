import { useAddItem } from "./AddItemRoot";
import { Field } from "../../../components/Field";

import banner from "../../../assets/list-banner.jpg";

export function AddItemPreview() {
    const { product } = useAddItem();

    if (!product) return null;

    return (
        <>
            <p className="mt-4 text-lg font-bold">Sobre este produto</p>
            <div className="mt-2 flex gap-4">
                <img src={banner} className="h-14 w-14 rounded-lg" />
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
                    <div className="flex items-center">
                        <Field.Root>
                            <Field.Content>
                                <Field.Label>
                                    <span className="text-xs">R$</span>
                                </Field.Label>
                                <Field.Input />
                            </Field.Content>
                        </Field.Root>
                    </div>
                </div>
            </div>
        </>
    );
}
