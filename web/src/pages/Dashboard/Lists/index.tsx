import { useEffect } from "react";

import { useLists } from "../../../contexts/ListsProvider";

import { CreateList } from "./CreateList";
import { ListButton } from "../../../components/ListButton";
import { Empty } from "../../../components/Empty";

import noListsImage from "../../../assets/no-lists.svg";

export function Lists() {
    const { lists } = useLists();

    useEffect(() => {
        document.title = "Minhas listas - RPB Shopping";
    }, []);

    if (!lists) return null;
    return (
        <div>
            <section className="flex justify-center">
                <CreateList />
            </section>
            <Empty.Root disabled={lists.length > 0}>
                <Empty.Image src={noListsImage} />
                <Empty.Title>Está tudo tão vazio por aqui</Empty.Title>
                <Empty.Description>
                    Você ainda não têm listas de compras criadas. Comece
                    clicando em "+ Criar nova lista" para criar a sua primeira
                    lista de compras!
                </Empty.Description>
            </Empty.Root>
            <section className="grid grid-cols-1 gap-6 px-4 py-8 md:grid-cols-2 md:px-8 xl:grid-cols-3">
                {lists.map((list) => (
                    <ListButton key={list.id} {...list} />
                ))}
            </section>
        </div>
    );
}
