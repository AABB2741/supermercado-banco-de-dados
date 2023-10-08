import { useEffect } from "react";
import { CheckCheck, Cherry, Laptop, Plus } from "lucide-react";

import { Banner } from "./Banner";
import { Filter } from "../../components/Filter";
import { AddItem } from "./AddItem";

import { useList } from "../../contexts/ListProvider";

export function List() {
    const { list } = useList();

    useEffect(() => {
        if (!list?.name) return;

        document.title = `${list.name} - RPB Shopping`;
    }, [list?.name]);

    return (
        <div>
            <Banner />
            <section className="p-8">
                <Filter
                    title="Filtrar produtos"
                    value="all"
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
                            icon: Laptop,
                            label: "Eletrônicos",
                            value: "electronic",
                        },
                    ]}
                />
                <div className="mt-4 flex items-center justify-between gap-4">
                    <input
                        type="text"
                        className="min-w-0 max-w-[500px] flex-1 rounded-full bg-gray-100 px-6 py-2 shadow-md outline-none focus:shadow-input dark:bg-zinc-900"
                        placeholder="Pesquisar itens"
                    />
                    <AddItem>
                        <button className="flex items-center gap-2 font-bold text-sky-500">
                            <Plus size={16} />
                            <span>Adicionar item</span>
                        </button>
                    </AddItem>
                </div>
            </section>
        </div>
    );
}
