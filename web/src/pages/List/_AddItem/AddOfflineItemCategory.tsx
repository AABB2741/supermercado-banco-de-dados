import React, { useEffect, useState, useMemo } from "react";
import { LucideProps } from "lucide-react";
import { Combobox } from "@headlessui/react";

import { useList } from "../../../contexts/ListProvider";
import { useAddItem } from "./AddItemRoot";

import { defaultProducts } from "../../../data/defaultProducts";

import banner from "../../../assets/list-banner.jpg";
import { normalize } from "../../../utils/normalize";

interface AddOfflineItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    search: string;
}

export function AddOfflineItemCategory({
    icon: Icon,
    title,
    search,
}: AddOfflineItemCategoryProps) {
    const [size, setSize] = useState(5);
    const products = useMemo(
        () =>
            defaultProducts
                .filter((p) => normalize(p.name).toLowerCase().includes(search))
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .slice(0, size),
        [search, size],
    );

    const { list } = useList();
    const { setProduct } = useAddItem();

    // Reinicia o tamanho de itens para exibir quando a pesquisa muda
    useEffect(() => {
        setSize(5);
    }, [search]);

    if (!products || products?.length === 0) return null;

    return (
        <div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 dark:bg-zinc-800">
                <Icon size={12} />
                <span className="text-xs">{title}</span>
            </div>
            <div className="p-2">
                {products?.map((p) => (
                    <Combobox.Option
                        className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                        value={p.id}
                        key={p.id}
                        onClick={() => setProduct(p)}
                    >
                        {p.isOffline ? (
                            <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                                style={{
                                    backgroundColor: list?.color ?? "#1e90ff",
                                }}
                            >
                                {p.name[0]}
                            </span>
                        ) : (
                            <img src={banner} className="h-8 w-8 rounded-lg" />
                        )}
                        <div className="flex-1 overflow-x-hidden">
                            <p
                                className="flex-1 break-all data-[has-brand=false]:line-clamp-2 data-[has-brand=true]:overflow-x-hidden data-[has-brand=true]:text-ellipsis data-[has-brand=true]:whitespace-nowrap"
                                data-has-brand={Boolean(p.brand)}
                            >
                                {p.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-zinc-400">
                                {p.brand?.name}
                            </p>
                        </div>
                        {p.price && (
                            <span className="text-sm text-green-500">
                                R${p.price.toFixed(2).replace(".", ",")}
                            </span>
                        )}
                    </Combobox.Option>
                ))}
                <button
                    onClick={() => setSize((size) => size + 5)}
                    className="mt-2 block w-full text-center text-sm"
                >
                    Mostrar mais
                </button>
            </div>
        </div>
    );
}
