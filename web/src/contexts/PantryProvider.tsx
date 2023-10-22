import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { PantryItem, getPantryItems } from "../services/pantry/getPantryItems";

import { removePantryItem } from "../services/pantry/removePantryItem";

import { addPantryItem } from "../services/pantry/addPantryItem";
import {
    EditPantryItemProps,
    editPantryItem,
} from "../services/pantry/editPantryItem";
import { getDefaultProduct } from "../data/defaultProducts";

import { PantryItemProps } from "../@types/pantry-item-props";

interface PantryContextValue {
    items: PantryItem[];
    setItems: React.Dispatch<React.SetStateAction<PantryItem[] | undefined>>;
    addItem: (data: Omit<PantryItemProps, "id" | "userId">) => Promise<void>;
    removeItem: (id: number) => Promise<void>;
    editItem: (id: number, data: EditPantryItemProps) => Promise<void>;
}

interface PantryProviderProps {
    children?: React.ReactNode;
}

const PantryContext = createContext({} as PantryContextValue);

export function PantryProvider({ children }: PantryProviderProps) {
    const [items, setItems] = useState<PantryItem[]>();

    async function addItem(data: Omit<PantryItemProps, "id" | "userId">) {
        if (!items) return;

        const item = await addPantryItem(data);
        const newItems = [...items];

        const index = newItems.findIndex((p) => p.id === item.id);

        if (item.isOffline) {
            if (index !== -1) {
                newItems[index] = {
                    ...item,
                    product: getDefaultProduct(item.offlineProductId),
                };
                setItems(newItems);
            } else {
                newItems.push({
                    ...item,
                    product: getDefaultProduct(item.offlineProductId),
                });
                setItems(newItems);
            }
        }
    }

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
    }

    async function editItem(id: number, data: EditPantryItemProps) {
        console.log("id", id);
        console.log("data", data);
        const item = await editPantryItem(id, data);

        if (item.isOffline) {
            try {
                const foundItem = getDefaultProduct(item.offlineProductId);
                const newItems = [...(items ?? [])];

                for (const i in newItems) {
                    const newItem = newItems[i];

                    if (newItem.id === item.id) {
                        newItems[i] = { ...item, product: foundItem };
                        break;
                    }
                }

                setItems(newItems);
            } catch (err) {
                console.error(err);
            }
        }
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
