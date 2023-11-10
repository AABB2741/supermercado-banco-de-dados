import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";

import { useAddItem } from "./AddItemRoot";
import { useList } from "../../../contexts/ListProvider";
import { useActiveElement } from "../../../hooks/useActiveElement";

import { Field } from "../../../components/Field";

import { editProduct } from "../../../services/products/editProduct";

import banner from "../../../assets/list-banner.jpg";

export function AddItemPreview() {
    const { list, loading, setList } = useList();
    const { product, setProduct, setDisabled } = useAddItem();

    const [editLoading, setEditLoading] = useState(false);
    const [brand, setBrand] = useState<string>();
    const [price, setPrice] = useState<number>();

    const brandRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);

    const { activeElement } = useActiveElement();

    const disabled =
        activeElement === brandRef.current ||
        activeElement === priceRef.current ||
        editLoading;

    useEffect(() => {
        setDisabled(disabled);
    }, [disabled, setDisabled]);

    if (!product) return null;

    async function handleEditProduct() {
        if (!product) return;

        setEditLoading(true);
        
        const response = await editProduct(product.id, {
            brand,
            price,
        });

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
        setBrand(undefined);
        setPrice(undefined);
        setEditLoading(false);
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
                                        disabled={loading}
                                        type="text"
                                        placeholder={
                                            product.brand ?? "Genérico"
                                        }
                                        value={brand ?? product.brand ?? ""}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                        onBlur={handleEditProduct}
                                        ref={brandRef}
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
                                        disabled={loading}
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
                                        ref={priceRef}
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
