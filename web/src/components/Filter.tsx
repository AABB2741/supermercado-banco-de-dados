import { LucideProps } from "lucide-react";

type FilterOption = {
    label: string;
    icon: React.ElementType<LucideProps>;
    value: string;
    color?: string;
};

interface FilterProps {
    title?: string;
    value?: string;
    options: FilterOption[];
    onValueChange?: (value: string) => void;
}

export function Filter({ title, value, options, onValueChange }: FilterProps) {
    return (
        <div>
            {title && <p className="mb-4 text-lg font-bold">{title}</p>}
            <div className="flex">
                {options.map((o) => (
                    <button
                        className="flex flex-col items-center rounded-xl border border-zinc-700 bg-zinc-900 px-8 py-4 shadow-lg data-[selected=true]:border-0 data-[selected=true]:bg-gradient-to-br data-[selected=true]:from-sky-400 data-[selected=true]:to-sky-600"
                        data-selected={value === o.value}
                        key={o.value}
                        onClick={() => onValueChange?.(o.value)}
                    >
                        <o.icon size={28} />
                        <p className="font-bold">{o.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
