import { Check, Plus } from "lucide-react";

interface IngredientProps {
    productId: number;
    name: string;
    required: number;
    has: number;
}

export function Ingredient({ name, required, has }: IngredientProps) {
    const hasEnough = has >= required;

    return (
        <div className="flex items-center justify-between gap-6">
            <div>
                <p className="text-lg font-bold">{name}</p>
                <p className="text-sm dark:text-zinc-300">
                    Necessário: {required}
                </p>
                <p className="text-sm dark:text-zinc-300">Você tem: {has}</p>
            </div>
            <div className="flex items-center gap-4">
                <Check
                    size={18}
                    color="currentColor"
                    className="hidden text-green-500 data-[has-enough=true]:block"
                    data-has-enough={hasEnough}
                />
                <button className="rounded-full p-2 dark:bg-zinc-900">
                    <Plus size={18} />
                </button>
            </div>
        </div>
    );
}
