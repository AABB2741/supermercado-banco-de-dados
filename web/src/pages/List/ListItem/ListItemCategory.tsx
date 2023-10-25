import { useState } from "react";
import { ChevronDown, ChevronUp, LucideProps } from "lucide-react";

import { ListItem } from ".";
import { ListItemProps } from "../../../@types/list-item-props";

interface ListItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    items: ListItemProps[];
}

export function ListItemCategory({
    icon: Icon,
    title,
    items,
}: ListItemCategoryProps) {
    const [open, setOpen] = useState(true);

    if (items.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="mb-4 flex flex-1 items-center gap-3">
                    <Icon size={18} />
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <button onClick={() => setOpen((open) => !open)}>
                    {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>
            <ul
                className="mb-8 grid grid-cols-1 gap-4 data-[open=false]:hidden sm:grid-cols-2 lg:grid-cols-3"
                data-open={open}
            >
                {items
                    .sort((a, b) => (a.checked > b.checked ? 1 : -1))
                    .map((i) => (
                        <ListItem.Box {...i} key={i.id} />
                    ))}
            </ul>
        </div>
    );
}
