import { useEffect } from "react";

export function Dashboard() {
    useEffect(() => {
        document.title = "Painel - RPB Shopping";
    }, []);

    return <h1>Dashboard</h1>;
}
