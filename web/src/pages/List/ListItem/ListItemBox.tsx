import { useEffect, useState } from "react";
import { Check } from "lucide-react";

import { ListItemProps } from "../../../@types/list-item-props";
import { ProductProps } from "../../../@types/product-props";

import { defaultProducts } from "../../../data/defaultProducts";
import { editItem } from "../../../services/list/editItem";

export function ListItemBox({ id, ...rest }: ListItemProps) {
    const [props, setProps] = useState(rest);
    const [data, setData] = useState<ProductProps>();

    useEffect(() => {
        if (props.isOffline) {
            const offlineProduct = defaultProducts.find(
                (p) => p.id === props.offlineProductId,
            );
            setData(offlineProduct);
        } else {
            setData(props.product);
        }
    }, [props.isOffline, props.offlineProductId, props.product]);

    async function handleCheckItem() {
        editItem({ id, checked: !props.checked }).then((res) => setProps(res));
    }

    if (!data) return null;

    return (
        <li className="flex items-center gap-3 rounded-xl border px-4 py-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            <button
                className="flex h-5 w-5 items-center justify-center rounded-md border p-1 data-[checked=true]:border-none data-[checked=true]:bg-sky-500 data-[checked=true]:text-white dark:border-zinc-700"
                data-checked={props.checked}
                onClick={handleCheckItem}
            >
                {props.checked && <Check size={14} />}
            </button>
            <div>
                <p>{data.name}</p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                    <span>x{props.amount}</span>
                    <span className="font-medium text-green-400">
                        R$
                        {(props.amount * (data.price ?? 0))
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>
                </p>
            </div>
        </li>
    );
}
