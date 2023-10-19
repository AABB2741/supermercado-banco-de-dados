import { useState, createContext, useContext, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import z from "zod";

import { AddItem } from ".";
import { Button } from "../../../components/Button";

import { useList } from "../../../contexts/ListProvider";

import { addItem } from "../../../services/list/addItem";

import { getDefaultProduct } from "../../../data/defaultProducts";

interface AddItemProviderValue {
    product?: Product;
    preview?: ProductPreview;
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
    setPreview: React.Dispatch<
        React.SetStateAction<ProductPreview | undefined>
    >;
}

interface AddItemProps {
    children: React.ReactNode;
}

type Product = {
    id: number;
    isOffline: boolean;
};

type ProductPreview = {
    name: string;
    price?: number;
};

const AddItemContext = createContext({} as AddItemProviderValue);

export function AddItemRoot({ children }: AddItemProps) {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [preview, setPreview] = useState<ProductPreview>();

    const amountRef = useRef<{ amount: number }>(null);
    const { list, setList } = useList();

    async function handleAddItem() {
        try {
            const listId = z
                .number()
                .int()
                .positive()
                .parse(list?.id);
            const productId = z
                .number()
                .int()
                .positive()
                .parse(product?.id);
            const amount = z
                .number()
                .int()
                .min(1)
                .parse(amountRef.current?.amount);
            const isOffline = z
                .boolean()
                .default(false)
                .parse(product?.isOffline);

            const item = await addItem({
                listId,
                productId: !isOffline ? productId : undefined,
                offlineProductId: isOffline ? productId : undefined,
                amount,
                isOffline,
            });

            if (isOffline) {
                const product = getDefaultProduct(item.offlineProductId);
                const newItem = { ...item, product };
                setList((list) => {
                    if (!list) throw new Error("List is not defined");

                    return {
                        ...list,
                        items: [...(list.items ?? []), newItem],
                    };
                });
            }
        } catch (err) {
            // TODO: Handle error
        }
    }

    return (
        <AddItemContext.Provider
            value={{ product, preview, setProduct, setPreview }}
        >
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>{children}</Dialog.Trigger>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] min-h-[250px] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                    <Dialog.Title className="mb-4 text-lg font-bold">
                        Adicionar item
                    </Dialog.Title>

                    <AddItem.Search />
                    <AddItem.Preview />
                    <AddItem.Editor ref={amountRef} />

                    <div className="mt-4 flex items-center justify-end gap-2">
                        <Dialog.Close
                            className="px-4 font-bold"
                            // disabled={loading}
                        >
                            Cancelar
                        </Dialog.Close>
                        <Button.Normal
                            accent
                            // loading={loading}
                            onClick={handleAddItem}
                        >
                            Adicionar item
                        </Button.Normal>
                    </div>
                </Dialog.Content>
            </Dialog.Root>
        </AddItemContext.Provider>
    );
}

export const useAddItem = () => useContext(AddItemContext);
