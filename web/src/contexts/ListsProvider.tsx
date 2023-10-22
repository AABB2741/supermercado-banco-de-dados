import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

import { getLists } from "../services/list/getLists";
import { deleteList as removeList } from "../services/list/deleteList";

import { ListProps } from "../@types/list-props";

interface ListsProviderProps {
    children: React.ReactNode;
}

interface ListsProviderValue {
    lists?: ListProps[];
    setLists: React.Dispatch<React.SetStateAction<ListProps[] | undefined>>;
    deleteList: (id: number) => Promise<void>;
}

const ListsContext = createContext({} as ListsProviderValue);

export function ListsProvider({ children }: ListsProviderProps) {
    const [lists, setLists] = useState<ListProps[]>();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        getLists(cancelToken.token)
            .then((lists) => {
                setLists(lists);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    // TODO: Handle error
                }
            });

        return () => {
            cancelToken.cancel();
            setLists(undefined);
        };
    }, []);

    async function deleteList(id: number) {
        const deletedList = await removeList(id);

        if (!lists) return;

        const newLists = [...lists];

        const deletedIndex = newLists.findIndex(
            (list) => list.id === deletedList.id,
        );

        if (deletedIndex !== -1) {
            newLists.splice(deletedIndex, 1);
            setLists(newLists);
        }
    }

    return (
        <ListsContext.Provider value={{ lists, setLists, deleteList }}>
            {children}
        </ListsContext.Provider>
    );
}

export const useLists = () => useContext(ListsContext);
