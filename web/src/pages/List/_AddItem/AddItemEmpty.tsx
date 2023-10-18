import { useAddItem } from "./AddItemRoot";

import emptyList from "../../../assets/empty-list.svg";

export function AddItemEmpty() {
    const { product } = useAddItem();

    if (product) return null;

    return (
        <div className="my-6">
            <img src={emptyList} className="mx-auto w-1/2" />
            <p className="text-center text-lg font-bold">
                Vamos adicionar um produto à essa lista!
            </p>
            <p className="text-center">
                Para começar, digite o nome do produto que você quer adicionar à
                lista na caixa de texto acima.
            </p>
        </div>
    );
}
