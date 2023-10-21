import { useEffect } from "react";

import { useLists } from "../../../contexts/ListsProvider";

import { CreateList } from "./CreateList";
import { ListButton } from "../../../components/ListButton";

export function Lists() {
    const { lists } = useLists();

    useEffect(() => {
        document.title = "Minhas listas - RPB Shopping";
    }, []);

    return (
        <div>
            <section className="flex justify-center">
                <CreateList />
            </section>
            <section className="mt-8 grid grid-cols-1 gap-6 px-8 md:grid-cols-2 xl:grid-cols-3">
                {lists?.map((list) => <ListButton key={list.id} {...list} />)}
            </section>
        </div>
    );
}
