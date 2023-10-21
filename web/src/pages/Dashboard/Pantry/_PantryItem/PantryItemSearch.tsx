import { Combobox } from "@headlessui/react";
import { useMemo, useState } from "react";
import { normalize } from "../../../../utils/normalize";

export function PantryItemSearch() {
    const [search, setSearch] = useState("");

    const normalizedSearch = useMemo(
        () => normalize(search).trim().toLowerCase(),
        [search],
    );

    return (
        <Combobox>
            <Combobox.Input
                className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                placeholder="Desinfetante, carne moída..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                <div
                    className="p-2 data-[empty=true]:hidden"
                    data-empty={!normalizedSearch}
                >
                    <Combobox.Option
                        className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                        value={0}
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white">
                            {normalizedSearch[0]}
                        </span>
                        <p className="line-clamp-2 flex-1 break-all">
                            {search.trim()}
                        </p>
                    </Combobox.Option>
                </div>
            </Combobox.Options>
        </Combobox>
    );
}
