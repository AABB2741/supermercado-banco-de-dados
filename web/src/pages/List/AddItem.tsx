import { useState } from "react";
import { History, Sparkles } from "lucide-react";
import { Combobox } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";

import avatar from "../../assets/avatar.png";

interface AddItemProps {
    children: React.ReactNode;
}

export function AddItem({ children }: AddItemProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                    <Dialog.Title className="mb-4 text-lg font-bold">
                        Adicionar item
                    </Dialog.Title>

                    <Combobox>
                        <Combobox.Input className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900" />
                        <Combobox.Options className="mt-2 overflow-hidden rounded-lg border shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                            <div className="flex items-center gap-2 bg-zinc-800 px-4 py-2">
                                <Sparkles size={12} />
                                <span className="text-xs">
                                    Sugestões para você
                                </span>
                            </div>
                            <div className="p-2">
                                <Combobox.Option
                                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-800"
                                    value={2}
                                >
                                    <img
                                        src={avatar}
                                        className="h-5 w-5 rounded-lg"
                                    />
                                    <span>Macarrão</span>
                                </Combobox.Option>
                            </div>
                        </Combobox.Options>
                    </Combobox>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
