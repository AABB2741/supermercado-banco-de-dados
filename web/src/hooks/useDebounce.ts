import { useEffect } from "react";

export function useDebounce(
    callback: () => void,
    delay: number,
    dependencies: unknown[],
) {
    useEffect(() => {
        const timeout = setTimeout(callback, delay);
        return () => clearTimeout(timeout);
    }, [...dependencies]);
}
