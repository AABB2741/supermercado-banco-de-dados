import { useEffect, useMemo, useState, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import z from "zod";

import { getList } from "../services/list/getList";

import { ErrorCode } from "../errors/AppError";
import axios from "axios";

import { ListProps } from "../@types/createList";

interface ListProviderProps {
    children: React.ReactNode;
}

interface ListProviderValue {
    list?: ListProps;
    error?: ErrorCode;
    setList: React.Dispatch<React.SetStateAction<ListProps | undefined>>;
}

const ListContext = createContext({} as ListProviderValue);

export function ListProvider({ children }: ListProviderProps) {
    const [list, setList] = useState<ListProps>();
    const [error, setError] = useState<ErrorCode>();

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

    return (
        <ListContext.Provider value={{ error, list, setList }}>
            {children}
        </ListContext.Provider>
    );
}

export const useList = () => useContext(ListContext);
