import { ChevronUp, LucideProps } from "lucide-react";

interface PantryItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
}

export function PantryItemCategory({
    icon: Icon,
    title,
}: PantryItemCategoryProps) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="mb-4 flex flex-1 items-center gap-3">
                    <Icon size={18} />
                    <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <button>
                    <ChevronUp size={18} />
                </button>
            </div>
        </div>
    );
}
