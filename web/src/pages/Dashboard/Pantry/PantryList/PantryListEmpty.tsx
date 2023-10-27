import { usePantry } from "../../../../contexts/PantryProvider";

import emptyPantry from "../../../../assets/empty-pantry.svg";

export function PantryListEmpty() {
    const { items } = usePantry();

    if (items.length > 0) return null;

    return (
        <div className="mx-auto my-10 flex max-w-[500px] flex-col items-center text-center">
            <img src={emptyPantry} className="max-w-[300px]" />
            <h2 className="text-lg font-bold">
                Nada além de teia e algumas aranhas...
            </h2>
            <p>
                Parece que você ainda não adicionou produtos à sua despensa.
                Conclua listas de compras ou clique em "+ Adicionar item" para
                começar.
            </p>
        </div>
    );
}
