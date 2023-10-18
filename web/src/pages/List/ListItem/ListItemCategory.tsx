import { ChevronUp, LucideProps } from "lucide-react";

import { useList } from "../../../contexts/ListProvider";

import { ListItem } from ".";

interface ListItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
}

export function ListItemCategory({ icon: Icon, title }: ListItemCategoryProps) {
    const { list } = useList();

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
            <ul className="mb-8 grid grid-cols-3 gap-4">
                {list?.items?.map((i) => <ListItem.Box {...i} key={i.id} />)}
            </ul>
        </div>
    );
}
