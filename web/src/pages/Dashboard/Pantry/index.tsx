import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

import { PantryItem } from "./PantryItem";

import { getPantryItems } from "../../../services/pantry/getPantryItems";

import { PantryItemProps } from "../../../@types/pantry-item-props";

interface PantryContextValue {
    items: PantryItemProps[];
    setItems: React.Dispatch<
        React.SetStateAction<PantryItemProps[] | undefined>
    >;
}

const PantryContext = createContext({} as PantryContextValue);

export function Pantry() {
    const [items, setItems] = useState<PantryItemProps[]>();

    useEffect(() => {
        document.title = "Minha despensa - RPB Shopping";
        const cancelToken = axios.CancelToken.source();

        getPantryItems(cancelToken.token).then((res) => {
            setItems(res);
        });

        return cancelToken.cancel;
    }, []);

    if (!items) return null;

    console.log(items);

    return (
        <div>
            <PantryContext.Provider value={{ items, setItems }}>
                <PantryItem.Root />
            </PantryContext.Provider>
        </div>
    );
}

export const usePantry = () => useContext(PantryContext);
