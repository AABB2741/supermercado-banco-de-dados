import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

import { getLists } from "../services/list/getLists";
import { deleteList as removeList } from "../services/list/deleteList";
import { toggleList } from "../services/list/toggleList";

import { ListProps } from "../@types/list-props";

interface ListsProviderProps {
    children: React.ReactNode;
}

interface ListsProviderValue {
    lists?: ListProps[];
    setLists: React.Dispatch<React.SetStateAction<ListProps[] | undefined>>;
    deleteList: (id: number) => Promise<void>;
    toggle: (id: number) => Promise<void>;
}

const ListsContext = createContext({} as ListsProviderValue);

function sortList(a: ListProps, b: ListProps) {
    if (a.checked && !b.checked) {
        return 1;
    } else if (!a.checked && b.checked) {
        return -1;
    }

    return a.name > b.name ? 1 : -1;
}

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

    async function toggle(id: number) {
        const list = await toggleList(id);

        const newLists = [...(lists ?? [])];

        for (const i in newLists) {
            if (newLists[i].id === list.id) {
                newLists[i] = list;
                break;
            }
        }

        setLists(newLists);
    }

    return (
        <ListsContext.Provider
            value={{
                lists: lists?.sort(sortList),
                setLists,
                deleteList,
                toggle,
            }}
        >
            {children}
        </ListsContext.Provider>
    );
}

export const useLists = () => useContext(ListsContext);
