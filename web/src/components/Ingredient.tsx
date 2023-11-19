import { Check, Plus } from "lucide-react";

interface IngredientProps {}

export function Ingredient() {
    return (
        <div className="flex items-center justify-between gap-6">
            <div>
                <p className="text-lg font-bold">Cenoura</p>
                <p className="text-sm dark:text-zinc-300">Necessário: 4</p>
                <p className="text-sm dark:text-zinc-300">Você tem: 4</p>
            </div>
            <div className="flex items-center gap-4">
                <Check
                    size={18}
                    color="currentColor"
                    className="text-green-500"
                />
                <button className="rounded-full p-2 dark:bg-zinc-900">
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
}
