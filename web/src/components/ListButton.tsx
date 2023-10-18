import { Link } from "react-router-dom";
import { CheckCircle, MoreVertical, Trash } from "lucide-react";
import * as Menubar from "@radix-ui/react-menubar";

import thumbnail from "../assets/list-banner.jpg";

import { ListProps } from "../@types/list-props";

export function ListButton({ id, name, color }: ListProps) {
    return (
        <div className="rounded-xl bg-gray-100 p-4 shadow-md dark:border dark:border-zinc-700 dark:bg-zinc-900">
            {/* Top */}
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle color="currentColor" size={12} />
                    <span className="text-sm font-bold">Compra concluída</span>
                </div>
                <Menubar.Root>
                    <Menubar.Menu>
                        <Menubar.Trigger>
                            <MoreVertical size={14} />
                        </Menubar.Trigger>
                        <Menubar.Portal>
                            <Menubar.Content
                                side="bottom"
                                sideOffset={8}
                                align="start"
                                className="max-h-[--radix-menubar-content-available-height] max-w-[--radix-menubar-content-available-width] overflow-hidden rounded-md border shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
                            >
                                <Menubar.Item className="flex cursor-pointer items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-600 hover:text-gray-100">
                                    <Trash size={12} />
                                    <span className="text-sm">Excluir</span>
                                </Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Portal>
                    </Menubar.Menu>
                </Menubar.Root>
            </div>

            {/* Center */}
            <Link className="flex items-center gap-4" to={"/list/" + id}>
                <div>
                    <img
                        src={thumbnail}
                        className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div
                        className="mx-auto mt-2 h-[6px] w-10 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                </div>
                <div>
                    <p className="font-featured text-xl font-bold">{name}</p>
                    <ul className="list-disc text-sm">
                        <li>Produto 1</li>
                        <li>Produto 2</li>
                        <li>Produto 3</li>
                    </ul>
                </div>
            </Link>
        </div>
    );
}
