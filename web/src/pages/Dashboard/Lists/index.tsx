import { useEffect } from "react";

import { CreateList } from "./CreateList";
import { ListButton } from "../../../components/ListButton";

export function Lists() {
    useEffect(() => {
        document.title = "Minhas listas - RPB Shopping";
    }, []);

    return (
        <div>
            <section className="flex justify-center">
                <CreateList />
            </section>
            <section className="mt-8 grid grid-cols-3 gap-6 px-8">
                <ListButton />
                <ListButton />
                <ListButton />
            </section>
        </div>
    );
}
