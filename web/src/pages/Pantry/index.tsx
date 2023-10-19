import { useEffect } from "react";

import { PantryItem } from "./PantryItem";

export function Pantry() {
    useEffect(() => {
        document.title = "Minha despensa - RPB Shopping";
    }, []);

    return (
        <div>
            <PantryItem.Root />
        </div>
    );
}
