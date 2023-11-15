import { usePantry } from "../../../../contexts/PantryProvider";

import { PantryList } from ".";
import { ShoppingBag } from "lucide-react";
import { Empty } from "../../../../components/Empty";

import emptyPantryImage from "../../../../assets/empty-pantry.svg";

export function PantryListRoot() {
    const { items } = usePantry();

    return (
        <div>
            <Empty.Root disabled={items.length > 0}>
                <Empty.Image src={emptyPantryImage} />
                <Empty.Title>
                    Nada além de teia e algumas aranhas...
                </Empty.Title>
                <Empty.Description>
                    Parece que você ainda não adicionou produtos à sua despensa.
                    Conclua listas de compras ou clique em "+ Adicionar item"
                    para começar.
                </Empty.Description>
            </Empty.Root>
            <PantryList.Category
                icon={ShoppingBag}
                title="Todos os produtos"
                items={items}
            />
        </div>
    );
}
