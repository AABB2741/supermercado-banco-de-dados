import { useEffect, useState } from "react";
import {
    Book,
    Carrot,
    CheckCheck,
    Cherry,
    Glasses,
    Hammer,
    Laptop,
    LeafyGreen,
    Plus,
    Shapes,
    Shirt,
} from "lucide-react";

import { Banner } from "./Banner";
import { Filter } from "../../components/Filter";
import { AddItem } from "./AddItem";
import { ListItem } from "./ListItem";
import { Suggestions } from "./Suggestions";

import { useList } from "../../contexts/ListProvider";
import { useDebounce } from "../../hooks/useDebounce";

import { normalize } from "../../utils/normalize";

export function List() {
    const [filter, setFilter] = useState("all");
    const [src, setSrc] = useState("");

    const { list, setSearch } = useList();

    useEffect(() => {
        if (!list?.name) return;

        document.title = `${list.name} - RPB Shopping`;
    }, [list?.name]);

    useDebounce(
        () => {
            setSearch(normalize(src.trim().toLowerCase()));
        },
        1000,
        [src],
    );

    if (!list) return null;

    return (
        <div>
            <Banner />
            <Suggestions />
            <section>
                <Filter
                    title="Filtrar produtos"
                    value={filter}
                    onValueChange={setFilter}
                    options={[
                        {
                            icon: CheckCheck,
                            label: "Tudo",
                            value: "all",
                        },
                        {
                            icon: Cherry,
                            label: "Frutas",
                            value: "fruits",
                        },
                        {
                            icon: LeafyGreen,
                            label: "Verduras",
                            value: "greens",
                        },
                        {
                            icon: Carrot,
                            label: "Legumes",
                            value: "vegetables",
                        },
                        {
                            icon: Laptop,
                            label: "Eletrônicos",
                            value: "electronic",
                        },
                        {
                            icon: Shirt,
                            label: "Vestimentas",
                            value: "clothes",
                        },
                        {
                            icon: Glasses,
                            label: "Acessórios",
                            value: "accessories",
                        },
                        {
                            icon: Hammer,
                            label: "Ferramentas",
                            value: "tools",
                        },
                        {
                            icon: Shapes,
                            label: "Brinquedos",
                            value: "toys",
                        },
                        {
                            icon: Book,
                            label: "Materiais escolares",
                            value: "school_supplies",
                        },
                    ]}
                />
                <div className="flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-10">
                    <input
                        type="text"
                        className="w-full min-w-0 max-w-[500px] flex-1 rounded-full bg-white px-6 py-2 shadow-md outline-none focus:shadow-input dark:bg-zinc-900"
                        placeholder="Pesquisar itens"
                        value={src}
                        onChange={(e) => setSrc(e.currentTarget.value)}
                    />
                    <AddItem.Root>
                        <button
                            className="flex items-center gap-2 font-bold"
                            style={{ color: list.color }}
                            disabled={list.checked}
                            title={
                                list.checked
                                    ? "Desmarque essa lista para adicionar mais itens"
                                    : undefined
                            }
                        >
                            <Plus size={16} />
                            <span>Adicionar item</span>
                        </button>
                    </AddItem.Root>
                </div>
            </section>
            <section className="mt-8 px-4 pb-4 md:px-6 md:pb-6 lg:px-10 lg:pb-10">
                <ListItem.Root />
            </section>
        </div>
    );
}
