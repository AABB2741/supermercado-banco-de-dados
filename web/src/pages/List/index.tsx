import { useEffect } from "react";

import { Banner } from "./Banner";

import { useList } from "../../contexts/ListProvider";

export function List() {
    const { list } = useList();

    useEffect(() => {
        if (!list?.name) return;

        document.title = `${list.name} - RPB Shopping`;
    }, [list?.name]);
    console.log("Carregando lista");
    return <Banner />;
}
