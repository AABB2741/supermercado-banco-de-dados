import { createContext, useContext, useRef, useState } from "react";
import { Plus } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

import { PantryItem } from ".";
import { Button } from "../../../../components/Button";

import z from "zod";

type Product = {
    id: number;
    isOffline: boolean;
    price?: boolean;
};

type ProductPreview = {
    name: string;
    price?: number;
};

interface AddPantryItemValue {
    product?: Product;
    preview?: ProductPreview;
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
    setPreview: React.Dispatch<
        React.SetStateAction<ProductPreview | undefined>
    >;
}

const AddPantryItemContext = createContext({} as AddPantryItemValue);

export function PantryItemAdd() {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState<Product>();
    const [preview, setPreview] = useState<ProductPreview>();

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
        <AddPantryItemContext.Provider
            value={{ product, preview, setProduct, setPreview }}
        >
            <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                    <button className="font-white flex items-center justify-center gap-4 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 px-10 py-6 font-bold text-gray-100">
                        <Plus />
                        <span>Adicionar item</span>
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                        <Dialog.Title className="mb-4 text-lg font-bold">
                            Adicionar item à despensa
                        </Dialog.Title>

                        <PantryItem.Search />
                        <PantryItem.AddEmpty />
                        <PantryItem.AddPreview />
                        <PantryItem.AddManager ref={managerRef} />

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
        </AddPantryItemContext.Provider>
    );
}

export const useAddPantryItem = () => useContext(AddPantryItemContext);
