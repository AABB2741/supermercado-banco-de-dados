import React, { useState } from "react";
import { LucideProps } from "lucide-react";
import { Combobox } from "@headlessui/react";

import { useDebounce } from "../../hooks/useDebounce";

import { getProducts } from "../../services/products/getProducts";

import { ProductProps } from "../../@types/product-props";

import banner from "../../assets/list-banner.jpg";

interface AddItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    search: string;
    url: string;
    setSelectedItem: React.Dispatch<
        React.SetStateAction<ProductProps | undefined>
    >;
}

export function AddItemCategory({
    icon: Icon,
    title,
    search,
    url,
    setSelectedItem,
}: AddItemCategoryProps) {
    const [products, setProducts] = useState<ProductProps[]>();

    useDebounce(
        () => {
            getProducts(search).then((res) => setProducts(res));
        },
        1000,
        [search],
    );

    return (
        <>
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
                        onClick={() => setSelectedItem(p)}
                    >
                        <img src={banner} className="h-8 w-8 rounded-lg" />
                        <div className="flex-1">
                            <p>{p.name}</p>
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
        </>
    );
}
