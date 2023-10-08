import { ComponentProps, forwardRef, ForwardedRef } from "react";
import { DotSpinner } from "@uiball/loaders";

interface ButtonNormalProps extends ComponentProps<"button"> {
    accent?: boolean;
    loading?: boolean;
}

export const ButtonNormal = forwardRef(
    (
        { accent, loading, children, ...props }: ButtonNormalProps,
        ref: ForwardedRef<HTMLButtonElement>,
    ) => {
        return (
            <button
                type="button"
                {...props}
                className="flex items-center justify-center gap-4 rounded-lg px-4 py-2 font-bold outline-none focus:ring-4 focus:ring-sky-500 disabled:opacity-50 data-[loading=true]:pointer-events-none data-[accent=true]:bg-yellow-400 data-[accent=true]:text-black data-[loading=true]:opacity-50"
                data-accent={accent}
                data-loading={loading}
                ref={ref}
            >
                {loading && <DotSpinner size={14} color="currentColor" />}
                <div>{children}</div>
            </button>
        );
    },
);
