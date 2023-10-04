import { ComponentProps } from "react";

export function ButtonAccent(props: ComponentProps<"button">) {
    return (
        <button
            type="button"
            {...props}
            className="rounded-lg bg-yellow-400 px-4 py-2 font-bold"
        />
    );
}
