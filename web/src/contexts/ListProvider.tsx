import axios from "axios";
import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import z from "zod";

import { getList } from "../services/list/getList";
import { addItem as addListItem, AddItemProps } from "../services/list/addItem";

import { ListProps } from "../@types/list-props";
import { toggleList } from "../services/list/toggleList";

interface ListProviderProps {
    children: React.ReactNode;
}

interface ListProviderValue {
    list: ListProps;
    search: string;
    loading: boolean;
    setList: React.Dispatch<React.SetStateAction<ListProps | undefined>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    addItem: (props: AddItemProps) => Promise<void>;
    toggle: () => Promise<void>;
}

const ListContext = createContext({} as ListProviderValue);

export function ListProvider({ children }: ListProviderProps) {
    const [list, setList] = useState<ListProps>();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const params = useParams();

    const id = useMemo(() => z.coerce.number().parse(params.id), [params.id]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        getList(id, cancelToken.token)
            .then((list) => {
                setList(list);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    // TODO: Handle error
                }
            });

        return cancelToken.cancel;
    }, [id]);

    async function addItem(props: AddItemProps) {
        const res = await addListItem(props);
        setList(res);
    }

    async function toggle() {
        if (!list) return;

        setLoading(true);
        const newList = await toggleList(list.id);
        setList(newList);
        setLoading(false);
    }

    if (!list) return null;

    return (
        <ListContext.Provider
            value={{
                list,
                search,
                loading,
                setList,
                setSearch,
                addItem,
                toggle,
            }}
        >
            {children}
        </ListContext.Provider>
    );
}

export const useList = () => useContext(ListContext);
