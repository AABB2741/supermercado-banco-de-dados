import { useParams } from "react-router-dom";

export function List() {
    const { id } = useParams();

    return <h1>List {id}</h1>;
}
