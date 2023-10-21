import { createContext, useContext, useEffect, useState } from "react";
import { PantryItemProps } from "../@types/pantry-item-props";
import axios from "axios";
import { getPantryItems } from "../services/pantry/getPantryItems";

interface PantryContextValue {
    items: PantryItemProps[];
    setItems: React.Dispatch<
        React.SetStateAction<PantryItemProps[] | undefined>
    >;
}

interface PantryProviderProps {
    children?: React.ReactNode;
}

const PantryContext = createContext({} as PantryContextValue);

export function PantryProvider({ children }: PantryProviderProps) {
    const [items, setItems] = useState<PantryItemProps[]>();

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

    return <div className="p-8">{children}</div>;
}

export const usePantry = () => useContext(PantryContext);
