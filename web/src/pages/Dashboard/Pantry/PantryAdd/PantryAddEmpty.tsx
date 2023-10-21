import { usePantryAdd } from "./PantryAddroot";

import emptyList from "../../../../assets/empty-list.svg";

export function PantryAddEmpty() {
    const { product } = usePantryAdd();

    if (product) return null;

    return (
        <div className="my-6">
            <img src={emptyList} className="mx-auto w-1/2" />
            <p className="text-center text-lg font-bold">
                Vamos adicionar um produto à sua despensa!
            </p>
            <p className="text-center">
                Para começar, digite o nome do produto que você quer adicionar à
                despensa na caixa de texto acima.
            </p>
        </div>
    );
}
