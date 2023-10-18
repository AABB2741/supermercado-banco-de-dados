import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import z from "zod";

import { getList } from "../services/list/getList";

import { ErrorCode } from "../errors/AppError";
import axios from "axios";

import { ListProps } from "../@types/list-props";

interface ListProviderProps {
    children: React.ReactNode;
}

interface ListProviderValue {
    list?: ListProps;
    error?: ErrorCode;
    search: string;
    setList: React.Dispatch<React.SetStateAction<ListProps | undefined>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
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
    console.log(list);
    return (
        <ListContext.Provider
            value={{ error, list, search, setList, setSearch }}
        >
            {children}
        </ListContext.Provider>
    );
}

export const useList = () => useContext(ListContext);
