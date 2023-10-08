import { useEffect } from "react";

import { CreateList } from "./CreateList";

export function Lists() {
    useEffect(() => {
        document.title = "Minhas listas - RPB Shopping";
    }, []);

    return (
        <div>
            <section className="flex justify-center">
                <CreateList />
            </section>
        </div>
    );
}
