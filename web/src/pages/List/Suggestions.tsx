import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Sparkles } from "lucide-react";

export function Suggestions() {
    const [open, setOpen] = useState(true);

    return (
        <div className="mx-4 mt-4 rounded-xl border-2 border-gray-400 px-6 py-4 md:mx-6 md:mt-6 lg:mx-10 lg:mt-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Sparkles size={18} />
                    <span className="font-bold">Sugestões de produtos</span>
                </div>
                <button onClick={() => setOpen((open) => !open)}>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>
            <div
                className="mt-4 items-center gap-4 data-[open=true]:flex data-[open=false]:hidden"
                data-open={open}
            >
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
                <button className="flex items-center gap-2 rounded-full bg-gray-300 px-5 py-1">
                    <span>Amendoim</span>
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}
