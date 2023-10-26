import {
    useRef,
    useState,
    useMemo,
    forwardRef,
    useImperativeHandle,
} from "react";
import { Combobox } from "@headlessui/react";
import { ShoppingCart, Sparkles } from "lucide-react";

import { AddItem } from ".";

import { useAddItem } from "./AddItemRoot";
import { useProducts } from "../../../hooks/useProducts";
import { useList } from "../../../contexts/ListProvider";

import { normalize } from "../../../utils/normalize";
import { createProduct } from "../../../services/products/createProduct";

export type AddItemSearchRef = {
    clearSearch: () => void;
    searchRef: React.RefObject<HTMLInputElement>;
};

interface AddItemSearchProps {
    disabled?: boolean;
}

export const AddItemSearch = forwardRef<AddItemSearchRef, AddItemSearchProps>(
    ({ disabled }, ref) => {
        const { setProduct } = useAddItem();

        const [search, setSearch] = useState("");

        const normalizedSearch = useMemo(
            () => normalize(search).trim().toLowerCase(),
            [search],
        );

        const { list } = useList();
        const { basic, suggested } = useProducts(normalizedSearch);

        const searchRef = useRef<HTMLInputElement>(null);

        function clearSearch() {
            setSearch("");
        }

        async function handleChooseCustomItem(name: string) {
            const item = await createProduct(name);
            setProduct(item);
        }

        useImperativeHandle(ref, () => ({
            clearSearch,
            searchRef,
        }));

        if (!list) return null;

        return (
            <Combobox>
                <Combobox.Input
                    className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow read-only:pointer-events-none focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                    placeholder="Desinfetante, carne moída..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    readOnly={disabled}
                    ref={searchRef}
                    onKeyDown={(e) =>
                        e.key === "Enter" && handleChooseCustomItem(search)
                    }
                />
                <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                    <div
                        className="p-2 data-[empty=true]:hidden"
                        data-empty={!normalizedSearch}
                    >
                        <Combobox.Option
                            className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                            value={0}
                            onClick={() => handleChooseCustomItem(search)}
                        >
                            <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                                style={{
                                    backgroundColor: list.color ?? "#1e90ff",
                                }}
                            >
                                {normalizedSearch[0]}
                            </span>
                            <p className="line-clamp-2 flex-1 break-all">
                                {search.trim()}
                            </p>
                        </Combobox.Option>
                    </div>

                    <AddItem.Category
                        icon={Sparkles}
                        title="Recomendado para você"
                        products={suggested}
                    />

                    <AddItem.Category
                        icon={ShoppingCart}
                        title="Produtos básicos"
                        products={basic}
                    />
                </Combobox.Options>
            </Combobox>
        );
    },
);
