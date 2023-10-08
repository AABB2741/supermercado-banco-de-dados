import { useList } from "../../contexts/ListProvider";

export function List() {
    const { list } = useList();

    return <h1>List {JSON.stringify(list)}</h1>;
}
