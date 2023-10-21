import { useEffect } from "react";

import { PantryProvider } from "../../../contexts/PantryProvider";
import { PantryAdd } from "./PantryAdd";

export function Pantry() {
    useEffect(() => {
        document.title = "Minha despensa - RPB Shopping";
    }, []);

    return (
        <div>
            <PantryProvider>
                <div className="flex justify-center">
                    <PantryAdd.Root />
                </div>
            </PantryProvider>
        </div>
    );
}
