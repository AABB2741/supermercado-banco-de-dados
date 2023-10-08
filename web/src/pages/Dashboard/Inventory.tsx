import { useEffect } from "react";

export function Inventory() {
    useEffect(() => {
        document.title = "Meu inventário - RPB Shopping";
    }, []);

    return <h1>Inventory</h1>;
}
