import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

import thumbnail from "../assets/list-banner.jpg";

interface ListButtonProps {}

export function ListButton() {
    return (
        <Link to="/list/1" className="rounded-xl bg-gray-100 p-4">
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
                        style={{ backgroundColor: "#1e90ff" }}
                    />
                </div>
                <div>
                    <p className="font-featured text-xl font-bold">
                        Lista de compras de teste
                    </p>
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
