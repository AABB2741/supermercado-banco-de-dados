import { useEffect } from "react";

export function useDebounce(
    callback: () => void,
    delay: number,
    deps: React.DependencyList,
) {
    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [...deps]);
}
