import { useEffect, useState } from "react";

export function useActiveElement() {
    const [activeElement, setActiveElement] = useState(document.activeElement);

    useEffect(() => {
        function handleFocusIn() {
            setActiveElement(document.activeElement);
        }

        document.addEventListener("focusin", handleFocusIn);

        return () => {
            document.removeEventListener("focusin", handleFocusIn);
        };
    }, []);

    return { activeElement };
}
