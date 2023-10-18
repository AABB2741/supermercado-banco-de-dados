import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";

import { ListItem } from ".";
import { useList } from "../../../contexts/ListProvider";
import { normalize } from "../../../utils/normalize";

import emptyList from "../../../assets/empty-list.svg";
import emptySearch from "../../../assets/empty-search.svg";

export function ListItemRoot() {
    const { list, search } = useList();

    const items = useMemo(
        () =>
            list?.items?.filter((item) =>
                normalize(item.product?.name.toLowerCase() ?? "").includes(
                    search,
                ),
            ),
        [list?.items, search],
    );

    if (!items) return null;

    if (items.length === 0 && !search) {
        return (
            <div className="flex flex-col items-center text-center">
                <img src={emptyList} className="max-w-[300px]" />
                <p className="text-lg font-bold">Ainda não tem nada aqui.</p>
                <p>
                    Parece que a sua lista de compras está vazia. Adicione itens
                    clicando em "+ Adicionar item".
                </p>
            </div>
        );
    }

    if (items.length === 0 && search) {
        return (
            <div className="flex flex-col items-center text-center">
                <img src={emptySearch} className="max-w-[300px]" />
                <p className="text-lg font-bold">
                    Humm... não encontramos o que você procura.
                </p>
                <p>
                    Verifique se você digitou a pesquisa corretamente e tente
                    novamente.
                </p>
            </div>
        );
    }

    return (
        <div>
            <ListItem.Category
                icon={ShoppingBag}
                title="Todos os produtos"
                items={items}
            />
        </div>
    );
}
