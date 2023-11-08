import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Sparkles } from "lucide-react";

import { useList } from "../../contexts/ListProvider";

export function Suggestions() {
    const [open, setOpen] = useState(true);

    const { list } = useList();

    if (list.checked) return null;

    return (
        <div className="mx-4 mt-4 rounded-xl border-2 border-gray-400 dark:border-zinc-600 md:mx-6 md:mt-6 lg:mx-10 lg:mt-10">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <Sparkles size={18} />
                    <span className="font-bold">
                        Produtos sugeridos para esta lista
                    </span>
                </div>
                <button onClick={() => setOpen((open) => !open)}>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>
            <div
                className="items-center gap-4 overflow-auto px-6 pb-4 data-[open=true]:flex data-[open=false]:hidden"
                data-open={open}
            >
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1 dark:bg-zinc-900">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1 dark:bg-zinc-900">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1 dark:bg-zinc-900">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1 dark:bg-zinc-900">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}
