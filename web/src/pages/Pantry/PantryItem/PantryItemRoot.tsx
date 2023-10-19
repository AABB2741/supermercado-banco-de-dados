import { ShoppingBag } from "lucide-react";

import { PantryItem } from ".";

export function PantryItemRoot() {
    return (
        <div className="p-8">
            <PantryItem.Category icon={ShoppingBag} title="Todos os produtos" />
        </div>
    );
}
