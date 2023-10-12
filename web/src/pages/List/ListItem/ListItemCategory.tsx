import { Cherry, ChevronUp } from "lucide-react";

import { useList } from "../../../contexts/ListProvider";

import { ListItem } from ".";

export function ListItemCategory() {
    const { list } = useList();

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="mb-4 flex flex-1 items-center gap-3">
                    <Cherry size={18} />
                    <h2 className="text-xl font-bold">Guloseimas</h2>
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
