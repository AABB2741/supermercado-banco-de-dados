import { useState, useMemo } from "react";
import { Combobox } from "@headlessui/react";
import { ShoppingCart, Sparkles, Star } from "lucide-react";

import { useList } from "../../../contexts/ListProvider";
import { useAddItem } from "./AddItemRoot";
import { useDebounce } from "../../../hooks/useDebounce";

import { AddItem } from ".";

import { normalize } from "../../../utils/normalize";
import {
    getProducts,
    GetProductsProps,
} from "../../../services/products/getProducts";

export function AddItemSearch() {
    const [search, setSearch] = useState("");
    const src = useMemo(() => normalize(search.trim().toLowerCase()), [search]);
    const [products, setProducts] = useState<GetProductsProps>();

    const { list } = useList();
    const { setProduct } = useAddItem();

    useDebounce(
        () => {
            getProducts(src).then((res) => setProducts(res));
        },
        1000,
        [src],
    );

    return (
        <Combobox value={0}>
            <Combobox.Input
                className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="Desinfetante, carne moída..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <div className="p-2 data-[empty=true]:hidden" data-empty={!src}>
                    <Combobox.Option
                        className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                        value={2}
                        onClick={() => {
                            setProduct({ name: search });
                        }}
                    >
                        <span
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                            style={{
                                backgroundColor: list?.color ?? "#1e90ff",
                            }}
                        >
                            {src[0]}
                        </span>
                        <p className="line-clamp-2 flex-1 break-all">
                            {search}
                        </p>
                    </Combobox.Option>
                </div>
                <AddItem.Category
                    icon={Sparkles}
                    title="Sugestões para você"
                    products={products?.suggested}
                />
                <AddItem.Category
                    icon={ShoppingCart}
                    title="Produtos genéricos"
                    products={products?.all}
                />
                <AddItem.Category
                    icon={Star}
                    title="Produtos de marca"
                    products={products?.branded}
                />
            </Combobox.Options>
        </Combobox>
    );
}
