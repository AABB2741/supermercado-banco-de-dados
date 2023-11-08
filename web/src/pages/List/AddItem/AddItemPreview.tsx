import { useState } from "react";
import { Save } from "lucide-react";

import { useAddItem } from "./AddItemRoot";
import { Field } from "../../../components/Field";

import { editProduct } from "../../../services/products/editProduct";
import { useList } from "../../../contexts/ListProvider";

import banner from "../../../assets/list-banner.jpg";

export function AddItemPreview() {
    const { list, setList } = useList();
    const { product, setProduct } = useAddItem();
    const [brand, setBrand] = useState<string>();
    const [price, setPrice] = useState<number>();

    if (!product) return null;

    async function handleEditProduct() {
        if (!product) return;

        console.log("Antes", product);
        const response = await editProduct(product.id, {
            brand,
            price,
        });

        console.log("Depois", response);
        setProduct(response);

        const newItems = [...list.items];
        for (const i in newItems) {
            if (newItems[i].productId === product.id) {
                newItems[i].productId = response.id;
                newItems[i].product = { ...response };
                break;
            }
        }

        setList({
            ...list,
            items: newItems,
        });
    }

    return (
        <>
            <p className="mt-4 text-lg font-bold">Sobre este produto</p>
            <div className="mt-2 flex gap-4">
                <img src={banner} className="h-14 w-14 rounded-lg" />
                <div className="flex-1">
                    <p className="text-xl font-bold">{product.name}</p>
                    <div className="mt-1 flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <Field.Root>
                                <Field.Content>
                                    <Field.Label>
                                        <span className="text-xs font-medium">
                                            Marca
                                        </span>
                                    </Field.Label>
                                    <Field.Input
                                        type="text"
                                        placeholder={
                                            product.brand ?? "Genérico"
                                        }
                                        value={brand ?? product.brand ?? ""}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                        onBlur={handleEditProduct}
                                    />
                                </Field.Content>
                            </Field.Root>
                            <Field.Root>
                                <Field.Content>
                                    <Field.Label>
                                        <span className="text-xs font-medium">
                                            R$
                                        </span>
                                    </Field.Label>
                                    <Field.Input
                                        type="number"
                                        min={0}
                                        placeholder={
                                            product.price?.toString() ?? "0.00"
                                        }
                                        value={price ?? product.price ?? ""}
                                        onChange={(e) =>
                                            setPrice(parseFloat(e.target.value))
                                        }
                                        onBlur={handleEditProduct}
                                    />
                                </Field.Content>
                            </Field.Root>
                        </div>
                        <button onClick={handleEditProduct}>
                            <Save size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
