import { ComponentProps } from "react";

interface ButtonNormalProps extends ComponentProps<"button"> {
    accent?: boolean;
}

export function ButtonNormal({ accent, ...props }: ButtonNormalProps) {
    return (
        <button
            type="button"
            {...props}
            className="rounded-lg px-4 py-2 font-bold data-[accent=true]:bg-yellow-400"
            data-accent={accent}
        />
    );
}
