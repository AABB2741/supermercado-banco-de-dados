import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { PantryItem, getPantryItems } from "../services/pantry/getPantryItems";

import { removePantryItem } from "../services/pantry/removePantryItem";

import { PantryItemProps } from "../@types/pantry-item-props";

interface PantryContextValue {
    items: PantryItem[];
    setItems: React.Dispatch<React.SetStateAction<PantryItem[] | undefined>>;
    removeItem: (id: number) => Promise<PantryItemProps>;
}

interface PantryProviderProps {
    children?: React.ReactNode;
}

const PantryContext = createContext({} as PantryContextValue);

export function PantryProvider({ children }: PantryProviderProps) {
    const [items, setItems] = useState<PantryItem[]>();

    async function removeItem(id: number) {
        const removedItem = await removePantryItem(id);

        setItems((items) => {
            if (!items) throw new Error("items is not valid");

            const newItems = [...items];
            const index = items.findIndex((i) => i.id === removedItem.id);

            if (index !== -1) {
                newItems.splice(index, 1);
            }

            return newItems;
        });

        return removedItem;
    }

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
        <PantryContext.Provider value={{ items, setItems, removeItem }}>
            {children}
        </PantryContext.Provider>
    );
}

export const usePantry = () => useContext(PantryContext);
