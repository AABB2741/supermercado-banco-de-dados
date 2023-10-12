import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { ListItemProps } from "../../../@types/list-item-props";
import { ProductProps } from "../../../@types/product-props";

import { defaultProducts } from "../../../data/defaultProducts";

export function ListItemBox({
    id,
    checked,
    amount,
    isOffline,
    offlineProductId,
    product,
}: ListItemProps) {
    const [data, setData] = useState<ProductProps>();

    useEffect(() => {
        if (isOffline) {
            const offlineProduct = defaultProducts.find(
                (p) => p.id === offlineProductId,
            );
            setData(offlineProduct);
        } else {
            setData(product);
        }
    }, [isOffline, offlineProductId, product]);

    if (!data) return null;

    return (
        <li className="flex items-center gap-3 rounded-xl border px-4 py-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            <button
                className="flex h-5 w-5 items-center justify-center rounded-md border p-1 data-[checked=true]:border-none data-[checked=true]:bg-sky-500 data-[checked=true]:text-white dark:border-zinc-700"
                data-checked={checked}
            >
                {checked && <Check size={14} />}
            </button>
            <div>
                <p>{data.name}</p>
            </div>
        </li>
    );
}
