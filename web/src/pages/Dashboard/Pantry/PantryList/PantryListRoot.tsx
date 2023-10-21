import { usePantry } from "../../../../contexts/PantryProvider";

export function PantryListRoot() {
    const { items } = usePantry();

    return <div></div>;
}
