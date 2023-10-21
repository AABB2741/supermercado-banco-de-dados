import { usePantry } from "../../../../contexts/PantryProvider";

import { PantryList } from ".";
import { ShoppingBag } from "lucide-react";

export function PantryListRoot() {
    const { items } = usePantry();

    return (
        <div>
            <PantryList.Category
                icon={ShoppingBag}
                title="Todos os produtos"
                items={items}
            />
        </div>
    );
}
