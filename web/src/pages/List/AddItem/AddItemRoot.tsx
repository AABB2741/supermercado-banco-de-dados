import {
    useCallback,
    useState,
    createContext,
    useContext,
    useRef,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { AddItem } from ".";
import { Button } from "../../../components/Button";

import { useList } from "../../../contexts/ListProvider";

import { AddItemSearchRef } from "./AddItemSearch";
import { ProductProps } from "../../../@types/product-props";

interface AddItemProviderValue {
    product?: ProductProps;
    setProduct: React.Dispatch<React.SetStateAction<ProductProps | undefined>>;
}

interface AddItemProps {
    children: React.ReactNode;
}

export type ProductPreview = {
    name: string;
    price?: number;
};

const AddItemContext = createContext({} as AddItemProviderValue);

export function AddItemRoot({ children }: AddItemProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<ProductProps>();

    const searchRef = useRef<AddItemSearchRef>(null);
    const amountRef = useRef<{ amount: number }>(null);

    const { list, addItem } = useList();

    const handleAddItem = useCallback(() => {
        if (!product || !amountRef.current) return;

        addItem({
            productId: product.id,
            listId: list.id,
            amount: amountRef.current.amount,
        });
    }, [product, list]);

    return (
        <AddItemContext.Provider value={{ product, setProduct }}>
            <Dialog.Root
                open={open}
                onOpenChange={(openStatus) => !loading && setOpen(openStatus)}
            >
                <Dialog.Trigger asChild>{children}</Dialog.Trigger>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                    <Dialog.Title className="mb-4 text-lg font-bold">
                        Adicionar item
                    </Dialog.Title>

                    <AddItem.Search disabled={loading} ref={searchRef} />
                    <AddItem.Preview />
                    <AddItem.Editor ref={amountRef} />
                    <AddItem.Empty />

                    <div className="mt-4 flex items-center justify-end gap-2">
                        <Dialog.Close
                            className="px-4 font-bold"
                            disabled={loading}
                        >
                            Cancelar
                        </Dialog.Close>
                        <Button.Normal
                            accent
                            loading={loading}
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
