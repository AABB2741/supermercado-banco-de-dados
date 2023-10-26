import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Check,
    CheckCircle,
    Clock,
    Copy,
    MoreVertical,
    Trash,
} from "lucide-react";
import * as Menubar from "@radix-ui/react-menubar";

import { useLists } from "../contexts/ListsProvider";

import thumbnail from "../assets/list-banner.jpg";

import { ListProps } from "../@types/list-props";
import { getDefaultProduct } from "../data/defaultProducts";

export function ListButton({
    id,
    checked,
    name,
    color,
    items,
    _count,
}: ListProps) {
    const [previewItems, setPreviewItems] = useState<string[]>();

    const { deleteList, toggle } = useLists();

    useEffect(() => {
        if (!items) return;

        const res: string[] = [];

        for (const item of items) {
            if (item.isOffline) {
                try {
                    res.push(getDefaultProduct(item.offlineProductId).name);
                } catch (_) {
                    // console.error(err);
                }
            } else if (item.product) {
                res.push(item.product.name);
            }
        }

        setPreviewItems(res);
    }, [items]);

    return (
        <div className="rounded-xl bg-white p-4 shadow-md dark:border dark:border-zinc-700 dark:bg-zinc-900">
            {/* Top */}
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                    <div
                        className="flex items-center gap-3 text-green-500 data-[checked=false]:hidden"
                        data-checked={checked}
                    >
                        <CheckCircle color="currentColor" size={12} />
                        <span className="text-sm font-bold">
                            Compra concluída
                        </span>
                    </div>

                    <span
                        className="text-sm font-bold data-[checked=true]:hidden"
                        data-checked={checked}
                    >
                        {_count.items} itens
                    </span>
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
                                className="max-h-[--radix-menubar-content-available-height] max-w-[--radix-menubar-content-available-width] overflow-hidden rounded-md border border-gray-300 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
                            >
                                <Menubar.Item
                                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap px-3 py-1 outline-none hover:bg-gray-200 data-[checked=false]:text-green-500 data-[checked=true]:text-orange-500 dark:hover:bg-zinc-950"
                                    onClick={() => toggle(id)}
                                    data-checked={checked}
                                >
                                    {checked ? (
                                        <Clock size={12} />
                                    ) : (
                                        <Check size={12} />
                                    )}
                                    <span className="text-sm">
                                        {checked
                                            ? "Marcar como pendente"
                                            : "Marcar como concluído"}
                                    </span>
                                </Menubar.Item>
                                <Menubar.Item className="flex cursor-pointer items-center gap-2 whitespace-nowrap px-3 py-1 text-black outline-none hover:bg-gray-200 dark:text-white dark:hover:bg-zinc-950">
                                    <Copy size={12} />
                                    <span className="text-sm">
                                        Duplicar lista
                                    </span>
                                </Menubar.Item>
                                <Menubar.Separator className="h-[1px] bg-gray-300 dark:bg-zinc-800" />
                                <Menubar.Item
                                    className="flex cursor-pointer items-center gap-2 whitespace-nowrap px-3 py-1 text-red-500 outline-none hover:bg-red-500 hover:text-gray-100"
                                    onClick={() => deleteList(id)}
                                >
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
                <div className="flex-1 overflow-hidden">
                    <p className="font-featured text-xl font-bold">{name}</p>
                    <div className="mt-2 flex items-center gap-2 whitespace-nowrap text-xs">
                        <ul className="flex flex-1 items-center gap-2 overflow-hidden rounded-full">
                            {previewItems &&
                                previewItems.map((item, index) =>
                                    item ? (
                                        <li
                                            className="rounded-full bg-gray-200 px-4 py-1 dark:bg-zinc-800"
                                            key={index}
                                        >
                                            {item}
                                        </li>
                                    ) : null,
                                )}
                        </ul>
                        {_count && _count.items - 3 > 0 && (
                            <span>+{_count.items - 3}</span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
