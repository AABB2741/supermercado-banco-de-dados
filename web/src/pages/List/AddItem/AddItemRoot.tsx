import { useState, createContext, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { AddItem } from ".";

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
};

const AddItemContext = createContext({} as AddItemProviderValue);

export function AddItemRoot({ children }: AddItemProps) {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [preview, setPreview] = useState<ProductPreview>();

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
                </Dialog.Content>
            </Dialog.Root>
        </AddItemContext.Provider>
    );
}

export const useAddItem = () => useContext(AddItemContext);
