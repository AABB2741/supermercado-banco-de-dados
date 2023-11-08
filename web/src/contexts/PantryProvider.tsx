import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getPantryItems } from "../services/pantry/getPantryItems";

import { removePantryItem } from "../services/pantry/removePantryItem";

import { addPantryItem } from "../services/pantry/addPantryItem";
import {
    EditPantryItemProps,
    editPantryItem,
} from "../services/pantry/editPantryItem";

import { PantryItemProps } from "../@types/pantry-item-props";

interface PantryContextValue {
    items: PantryItemProps[];
    setItems: React.Dispatch<
        React.SetStateAction<PantryItemProps[] | undefined>
    >;
    addItem: (
        data: Omit<PantryItemProps, "id" | "userId" | "product">,
    ) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    editItem: (id: number, data: EditPantryItemProps) => Promise<void>;
}

interface PantryProviderProps {
    children?: React.ReactNode;
}

const PantryContext = createContext({} as PantryContextValue);

export function PantryProvider({ children }: PantryProviderProps) {
    const [items, setItems] = useState<PantryItemProps[]>();

    async function addItem(
        data: Omit<PantryItemProps, "id" | "userId" | "product">,
    ) {
        if (!items) return;

        const item = await addPantryItem(data);

        const newItems = [...items];
        const index = newItems.findIndex((i) => i.productId === item.productId);

        if (index !== -1) {
            newItems[index] = item;
        } else {
            newItems.push(item);
        }

        setItems(newItems);
    }

    async function removeItem(id: number) {
        if (!items) return;

        const removedItem = await removePantryItem(id);

        const newItems = [...items];
        const index = items.findIndex((i) => i.id === removedItem.id);

        if (index !== -1) {
            newItems.splice(index, 1);
        }

        setItems(newItems);
    }

    async function editItem(id: number, data: EditPantryItemProps) {
        if (!items) return;

        const item = await editPantryItem(id, data);

        const newItems = [...items];

        const index = newItems.findIndex((p) => p.id === item.id);

        if (index !== -1) {
            newItems[index] = item;
        }

        setItems(newItems);
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
        <PantryContext.Provider
            value={{ items, setItems, addItem, removeItem, editItem }}
        >
            {children}
        </PantryContext.Provider>
    );
}

export const usePantry = () => useContext(PantryContext);
