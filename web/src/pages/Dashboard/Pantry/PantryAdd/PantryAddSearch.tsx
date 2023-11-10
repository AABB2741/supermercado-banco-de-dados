import { Combobox } from "@headlessui/react";
import { useMemo, useState } from "react";

import { PantryAdd } from ".";

import { normalize } from "../../../../utils/normalize";
import { useProducts } from "../../../../hooks/useProducts";
import { PencilLine, ShoppingCart } from "lucide-react";

export function PantryAddSearch() {
    const [search, setSearch] = useState("");

    const normalizedSearch = useMemo(
        () => normalize(search).trim().toLowerCase(),
        [search],
    );

    const { basic, custom } = useProducts(normalizedSearch);

    return (
        <Combobox>
            <Combobox.Input
                className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="Desinfetante, carne moída..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <PantryAdd.Category
                    icon={ShoppingCart}
                    title="Produtos básicos"
                    products={basic}
                    isOffline
                />
                <PantryAdd.Category
                    icon={PencilLine}
                    title="Produtos que você usa"
                    products={custom}
                    isOffline
                />
            </Combobox.Options>
        </Combobox>
    );
}
