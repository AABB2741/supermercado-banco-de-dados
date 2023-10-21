import { useState } from "react";
import { PenLine, X } from "lucide-react";

import { usePantry } from "../../../../contexts/PantryProvider";
import { PantryItem } from "../../../../services/pantry/getPantryItems";

export function PantryListItem({ id, amount, product }: PantryItem) {
    const [loading, setLoading] = useState(false);

    const { removeItem } = usePantry();

    async function handleRemove() {
        setLoading(true);
        try {
            const removedItem = await removeItem(id);
            console.log(removedItem);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <li
            className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-md data-[loading=true]:pointer-events-none dark:border-zinc-700 dark:bg-zinc-900"
            data-loading={loading}
        >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500">
                {product.name[0]}
            </span>
            <div className="flex-1">
                <p>{product.name}</p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                    <span>x{amount}</span>
                </p>
            </div>
            <div className="flex items-center gap-2">
                <PenLine size={16} />
                <button onClick={handleRemove}>
                    <X size={16} className="text-red-600" />
                </button>
            </div>
        </li>
    );
}
