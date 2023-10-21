import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";

import { getLists } from "../services/list/getLists";

import { ListProps } from "../@types/list-props";

interface ListsProviderProps {
    children: React.ReactNode;
}

interface ListsProviderValue {
    lists?: ListProps[];
    setLists: React.Dispatch<React.SetStateAction<ListProps[] | undefined>>;
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
    console.log(lists);
    return (
        <ListsContext.Provider value={{ lists, setLists }}>
            {children}
        </ListsContext.Provider>
    );
}

export const useLists = () => useContext(ListsContext);
