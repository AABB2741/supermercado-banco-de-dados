import { Check } from "lucide-react";

import { useList } from "../../../contexts/ListProvider";

import { editItem } from "../../../services/list/editItem";

import { ListItemProps } from "../../../@types/list-item-props";

export function ListItemBox({ id, checked, amount, product }: ListItemProps) {
    const { list, setList } = useList();

    async function handleCheckItem() {
        if (list.checked) return;

        const item = await editItem({ id, checked: !checked });
        setList((list) => {
            if (!list) return list;

            const newList = { ...list };

            if (!newList.items) return list;

            for (const i in newList.items) {
                const listItem = newList.items[i];

                if (!listItem) break;

                if (listItem.id === item.id) {
                    newList.items[i].checked = item.checked;
                }
            }
            return newList;
        });
    }

    if (!product) return null;

    return (
        <li
            className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-md data-[disabled=true]:cursor-not-allowed data-[checked=true]:opacity-75 dark:border-zinc-700 dark:bg-zinc-900"
            data-disabled={list.checked}
            data-checked={checked}
            key={id}
            title={
                list.checked
                    ? "A lista está marcada como concluída. Desmarque para selecionar os itens."
                    : undefined
            }
        >
            <button
                className="flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 p-1 disabled:pointer-events-none data-[checked=true]:border-none data-[checked=true]:bg-sky-500 data-[checked=true]:text-white dark:border-zinc-700"
                data-checked={checked}
                disabled={list.checked}
                onClick={handleCheckItem}
            >
                {checked && <Check size={14} />}
            </button>
            <div className="flex-1 overflow-hidden">
                <p
                    className="overflow-hidden text-ellipsis font-medium data-[checked=true]:line-through"
                    data-checked={checked}
                >
                    {product.name}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                    {product.brand && <span>{product.brand}</span>}
                    <span>x{amount}</span>
                    <span className="font-medium text-green-400">
                        R$
                        {(amount * (product.price ?? 0))
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>
                </p>
            </div>
        </li>
    );
}

// export function ListItemBox({ id, ...rest }: ListItemProps) {
//     const [props, setProps] = useState(rest);
//     const [data, setData] = useState<ProductProps>();

//     useEffect(() => {
//         if (props.isOffline) {
//             const offlineProduct = defaultProducts.find(
//                 (p) => p.id === props.offlineProductId,
//             );
//             setData(offlineProduct);
//         } else {
//             setData(props.product);
//         }
//     }, [props.isOffline, props.offlineProductId, props.product]);

//     async function handleCheckItem() {
//         editItem({ id, checked: !props.checked }).then((res) => setProps(res));
//     }

//     if (!data) return null;

//     return (
//         <li className="flex items-center gap-3 rounded-xl border px-4 py-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
//             <button
//                 className="flex h-5 w-5 items-center justify-center rounded-md border p-1 data-[checked=true]:border-none data-[checked=true]:bg-sky-500 data-[checked=true]:text-white dark:border-zinc-700"
//                 data-checked={props.checked}
//                 onClick={handleCheckItem}
//             >
//                 {props.checked && <Check size={14} />}
//             </button>
//             <div>
//                 <p>{data.name}</p>
//                 <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
//                     <span>x{props.amount}</span>
//                     <span className="font-medium text-green-400">
//                         R$
//                         {(props.amount * (data.price ?? 0))
//                             .toFixed(2)
//                             .replace(".", ",")}
//                     </span>
//                 </p>
//             </div>
//         </li>
//     );
// }
