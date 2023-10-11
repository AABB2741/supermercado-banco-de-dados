import React from "react";
import { LucideProps } from "lucide-react";
import { Combobox } from "@headlessui/react";

import { ProductProps } from "../../@types/product-props";

import banner from "../../assets/list-banner.jpg";

interface AddItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    products?: ProductProps[];
}

export function AddItemCategory({
    icon: Icon,
    title,
    products,
}: AddItemCategoryProps) {
    // TODO: onClick

    return (
        <div
            className="data-[empty=true]:hidden"
            data-empty={products && products.length === 0}
        >
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
                        // onClick={() => setSelectedItem(p)}
                    >
                        <img src={banner} className="h-8 w-8 rounded-lg" />
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
            </div>
        </div>
    );
}
