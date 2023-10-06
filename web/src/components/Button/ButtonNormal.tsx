import { ComponentProps, forwardRef, ForwardedRef } from "react";

interface ButtonNormalProps extends ComponentProps<"button"> {
    accent?: boolean;
}

export const ButtonNormal = forwardRef(
    (
        { accent, ...props }: ButtonNormalProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ) => {
        return (
            <button
                type="button"
                {...props}
                className="rounded-lg px-4 py-2 font-bold data-[accent=true]:bg-yellow-400 data-[accent=true]:text-black"
                data-accent={accent}
                ref={ref}
            />
        );
    },
);
