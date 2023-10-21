import { ChevronUp, LucideProps } from "lucide-react";

import { PantryList } from ".";

import { PantryItem } from "../../../../services/pantry/getPantryItems";

interface PantryListCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    items: PantryItem[];
}

export function PantryListCategory({
    icon: Icon,
    title,
    items,
}: PantryListCategoryProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="mb-4 flex flex-1 items-center gap-3">
                    <Icon size={18} />
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <button>
                    <ChevronUp size={18} />
                </button>
            </div>
            <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <PantryList.Item {...item} key={item.id} />
                ))}
            </ul>
        </div>
    );
}
