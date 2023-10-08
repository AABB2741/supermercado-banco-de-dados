import { useEffect } from "react";

export function Dashboard() {
    useEffect(() => {
        document.title = "Painel - RPB Shopping";
    }, []);

    return <h1>For you</h1>;
}
