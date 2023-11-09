import { forwardRef } from "react";

type FieldInputProps = React.ComponentProps<"input">;

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
    ({ ...rest }, ref) => {
        return (
            <input
                {...rest}
                className="min-w-0 flex-1 rounded-br-md bg-transparent pl-2 text-xs outline-none transition-shadow focus:shadow-input"
                ref={ref}
            />
        );
    },
);
