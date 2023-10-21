import * as Dialog from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

import { PantryItem } from ".";
import { Button } from "../../../../components/Button";

export function PantryItemAdd() {
    async function handleAddItem() {}

    return (
        <Dialog.Root>
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
    );
}
