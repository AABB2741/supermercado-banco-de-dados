import { ProductProps } from "../../../@types/product-props";

export function PantryItemBox({ id }: ProductProps) {
    return (
        <li
            className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-md dark:border-zinc-700 dark:bg-zinc-900"
            key={id}
        >
            <span>A</span>
            <div>
                <p>Cenoura</p>
                <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-400">
                    x38
                </p>
            </div>
        </li>
    );
}
