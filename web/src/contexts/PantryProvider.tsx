import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { PantryItem, getPantryItems } from "../services/pantry/getPantryItems";

interface PantryContextValue {
    items: PantryItem[];
    setItems: React.Dispatch<React.SetStateAction<PantryItem[] | undefined>>;
}

interface PantryProviderProps {
    children?: React.ReactNode;
}

const PantryContext = createContext({} as PantryContextValue);

export function PantryProvider({ children }: PantryProviderProps) {
    const [items, setItems] = useState<PantryItem[]>();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        getPantryItems(cancelToken.token)
            .then((res) => {
                setItems(res);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    // TODO: Handle error
                }
            });

        return cancelToken.cancel;
    }, []);

    if (!items) return null;

    return (
        <PantryContext.Provider value={{ items, setItems }}>
            {children}
        </PantryContext.Provider>
    );
}

export const usePantry = () => useContext(PantryContext);
