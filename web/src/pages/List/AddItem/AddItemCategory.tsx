import { useState } from "react";
import { ChevronDown, ChevronUp, LucideProps } from "lucide-react";
import { Combobox } from "@headlessui/react";

import { useList } from "../../../contexts/ListProvider";
import { useAddItem } from "./AddItemRoot";

import { ProductProps } from "../../../@types/product-props";

import banner from "../../../assets/list-banner.jpg";

type AddItemCategoryProps = {
    icon: React.ElementType<LucideProps>;
    title: string;
    products: ProductProps[];
};

export function AddItemCategory({
    icon: Icon,
    title,
    products,
}: AddItemCategoryProps) {
    const [open, setOpen] = useState(true);

    const { list } = useList();
    const { setProduct } = useAddItem();

    if (!list || products.length === 0) return null;

    function handleChooseItem(data: ProductProps) {
        setProduct(data);
    }

    return (
        <div>
            <div className="space-between flex items-center gap-2 bg-gray-100 px-4 py-2 dark:bg-zinc-800">
                <Icon size={12} />
                <span className="flex-1 text-xs">{title}</span>
                <button onClick={() => setOpen((open) => !open)}>
                    {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
            </div>
            <div className="p-2 data-[closed=true]:hidden" data-closed={!open}>
                {products?.map((p) => (
                    <Combobox.Option
                        className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                        value={p.id}
                        key={p.id}
                        onClick={() => handleChooseItem(p)}
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
                                {p.brand}
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
