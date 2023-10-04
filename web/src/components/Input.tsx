import { ComponentProps, forwardRef, ForwardedRef } from "react";

interface InputProps extends ComponentProps<"input"> {
    label?: string;
}

export const Input = forwardRef(
    ({ label, ...rest }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
        return (
            <div>
                {label && (
                    <label htmlFor={rest.id} className="mb-2 block">
                        {label}
                    </label>
                )}
                <input
                    className="focus:shadow-input block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:ring-0 focus:ring-transparent"
                    {...rest}
                    ref={ref}
                />
            </div>
        );
    },
);
