import { useParams } from "react-router-dom";

export function Recipe() {
    const { id } = useParams();

    if (!id) return null;

    return <h1>Recipe {id}</h1>;
}
