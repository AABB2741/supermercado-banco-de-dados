import { useEffect } from "react";

import { PantryProvider } from "../../../contexts/PantryProvider";

import { PantryAdd } from "./PantryAdd";
import { PantryList } from "./PantryList";

export function Pantry() {
    useEffect(() => {
        document.title = "Minha despensa - RPB Shopping";
    }, []);

    return (
        <div className="p-8">
            <PantryProvider>
                <div className="flex justify-center">
                    <PantryAdd.Root />
                </div>
                <PantryList.Root />
            </PantryProvider>
        </div>
    );
}
