import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import thumbnail from "../assets/list-banner.jpg";

import { ListProps } from "../@types/list-props";

export function ListButton({ id, name, color }: ListProps) {
    return (
        <Link
            to={"/list/" + id}
            className="rounded-xl bg-gray-100 p-4 shadow-md dark:border dark:border-zinc-700 dark:bg-zinc-900"
        >
            {/* Top */}
            <div className="mb-2">
                <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle color="currentColor" size={12} />
                    <span className="text-sm font-bold">Compra concluída</span>
                </div>
            </div>

            {/* Center */}
            <div className="flex items-center gap-4">
                <div>
                    <img
                        src={thumbnail}
                        className="h-16 w-16 rounded-xl object-cover"
                    />
                    <div
                        className="mx-auto mt-2 h-2 w-10 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                </div>
                <div>
                    <p className="font-featured text-xl font-bold">{name}</p>
                    <ul className="list-disc text-sm">
                        <li>Produto 1</li>
                        <li>Produto 2</li>
                        <li>Produto 3</li>
                    </ul>
                </div>
            </div>
        </Link>
    );
}
