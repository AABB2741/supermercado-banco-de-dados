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
            <div className="flex gap-2">
                {options.map((o) => (
                    <button
                        className="flex flex-col items-center whitespace-nowrap rounded-xl bg-gray-100 px-8 py-4 shadow-md data-[selected=true]:border-0 data-[selected=true]:bg-gradient-to-br data-[selected=true]:from-sky-400 data-[selected=true]:to-sky-600 data-[selected=true]:text-white dark:border dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:data-[selected=true]:border-none"
                        data-selected={value === o.value}
                        key={o.value}
                        onClick={() => onValueChange?.(o.value)}
                    >
                        <o.icon size={28} />
                        <p className="mt-2 font-bold">{o.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}