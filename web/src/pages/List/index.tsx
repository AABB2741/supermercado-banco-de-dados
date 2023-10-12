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

import { useList } from "../../contexts/ListProvider";

export function List() {
    const [filter, setFilter] = useState("all");

    const { list } = useList();

    useEffect(() => {
        if (!list?.name) return;

        document.title = `${list.name} - RPB Shopping`;
    }, [list?.name]);
    console.log(list);
    return (
        <div>
            <Banner />
            <section className="p-8">
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
                <div className="mt-8 flex items-center justify-between gap-4">
                    <input
                        type="text"
                        className="min-w-0 max-w-[500px] flex-1 rounded-full bg-gray-100 px-6 py-2 shadow-md outline-none focus:shadow-input dark:bg-zinc-900"
                        placeholder="Pesquisar itens"
                    />
                    <AddItem.Root>
                        <button className="flex items-center gap-2 font-bold text-sky-500">
                            <Plus size={16} />
                            <span>Adicionar item</span>
                        </button>
                    </AddItem.Root>
                </div>
            </section>
        </div>
    );
}
