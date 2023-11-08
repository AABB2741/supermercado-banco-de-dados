import { useState } from "react";
import { PenLine, SpaceIcon, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";

import { usePantry } from "../../../../contexts/PantryProvider";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/Button";

import { PantryItemProps } from "../../../../@types/pantry-item-props";

export function PantryListItem({ id, amount, product }: PantryItemProps) {
    const [editAmount, setEditAmount] = useState(amount);

    const { removeItem, editItem } = usePantry();

    function handleEdit() {
        editItem(id, { amount: editAmount });
    }

    return (
        <li className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                {product.name[0]}
            </span>
            <div className="flex-1">
                <p>{product.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-zinc-400">
                    {product.brand && <span>{product.brand}</span>}
                    <span>x{amount}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button>
                            <PenLine size={16} />
                        </button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                        <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                            <Dialog.Title className="mb-4 text-lg font-bold">
                                Edtar item
                            </Dialog.Title>

                            <span className="mx-auto mb-4 flex h-7 w-7 items-center justify-center rounded-md bg-sky-500 text-sm">
                                {product.name[0]}
                            </span>
                            <h1 className="text-center text-2xl font-bold">
                                {product.name}
                            </h1>

                            <p className="mb-2 mt-4 text-lg font-bold">
                                Quantidade
                            </p>
                            <Slider.Root
                                className="relative flex h-2 select-none items-center"
                                defaultValue={[1]}
                                min={1}
                                max={100}
                                value={[!isNaN(editAmount) ? editAmount : 0]}
                                onValueChange={(value) =>
                                    setEditAmount(value[0])
                                }
                            >
                                <Slider.Track className="relative h-2 flex-grow overflow-hidden rounded-full bg-gray-400 dark:bg-zinc-600">
                                    <Slider.Range className="absolute h-full bg-white dark:bg-sky-500" />
                                </Slider.Track>
                                <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow-md dark:bg-sky-500" />
                            </Slider.Root>
                            <div className="mt-4 flex items-center justify-between">
                                <Input
                                    type="number"
                                    value={!isNaN(editAmount) ? editAmount : 0}
                                    onChange={(e) =>
                                        setEditAmount(parseInt(e.target.value))
                                    }
                                    min={1}
                                />
                                <span className="font-bold text-red-500">
                                    R$
                                    {typeof product.price === "number"
                                        ? (product.price * editAmount)
                                              .toFixed(2)
                                              .replace(".", ",")
                                        : "0,00"}
                                </span>
                            </div>

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
                                    onClick={handleEdit}
                                >
                                    Editar item
                                </Button.Normal>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
                <button onClick={() => removeItem(id)}>
                    <X size={16} className="text-red-600" />
                </button>
            </div>
        </li>
    );
}
