import axios from "axios";
import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import z from "zod";

import { getList } from "../services/list/getList";
import { addItem as addListItem, AddItemProps } from "../services/list/addItem";

import { ErrorCode } from "../errors/AppError";

import { ListProps } from "../@types/list-props";
import { toggleList } from "../services/list/toggleList";

interface ListProviderProps {
    children: React.ReactNode;
}

interface ListProviderValue {
    list: ListProps;
    error?: ErrorCode;
    search: string;
    setList: React.Dispatch<React.SetStateAction<ListProps | undefined>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    addItem: (props: AddItemProps) => Promise<void>;
    toggle: () => Promise<void>;
}

const ListContext = createContext({} as ListProviderValue);

export function ListProvider({ children }: ListProviderProps) {
    const [list, setList] = useState<ListProps>();
    const [error, setError] = useState<ErrorCode>();
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

        const { checked } = await toggleList(list.id);
        setList({ ...list, checked });
    }

    if (!list) return null;

    return (
        <ListContext.Provider
            value={{ error, list, search, setList, setSearch, addItem, toggle }}
        >
            {children}
        </ListContext.Provider>
    );
}

export const useList = () => useContext(ListContext);
