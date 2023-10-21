import { useState, createContext, useContext, useRef } from "react";
import { Plus } from "lucide-react";
import z from "zod";
import * as Dialog from "@radix-ui/react-dialog";

import { PantryAdd } from ".";
import { Button } from "../../../../components/Button";
import { ProductProps } from "../../../../@types/product-props";

type Product = ProductProps & {
    isOffline: boolean;
};

interface PantryAddValue {
    product?: Product;
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
}

const PantryAddContext = createContext({} as PantryAddValue);

export function PantryAddRoot() {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product>();

    const managerRef = useRef<{ amount: number }>(null);

    async function handleAddItem() {
        try {
            const amount = z
                .number()
                .positive()
                .parse(managerRef.current?.amount);
            console.log(amount);
        } catch (err) {
            // TODO: Handle error
        }
    }

    return (
        <PantryAddContext.Provider value={{ product, setProduct }}>
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                    <button className="font-white flex items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 px-10 py-6 font-bold text-gray-100">
                        <Plus />
                        <span>Adicionar item</span>
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                    <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                        <Dialog.Title className="mb-4 text-lg font-bold">
                            Adicionar item à despensa
                        </Dialog.Title>

                        <PantryAdd.Search />
                        <PantryAdd.Empty />
                        <PantryAdd.Preview />

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
                </Dialog.Portal>
            </Dialog.Root>
        </PantryAddContext.Provider>
    );
}

export const usePantryAdd = () => useContext(PantryAddContext);
