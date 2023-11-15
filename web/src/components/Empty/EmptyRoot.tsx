import { twMerge } from "tailwind-merge";

type EmptyRootProps = React.ComponentProps<"div"> & {
    disabled?: boolean;
};

export function EmptyRoot({ disabled, className, ...rest }: EmptyRootProps) {
    if (disabled) return null;

    return (
        <div
            {...rest}
            className={twMerge(
                "mx-auto my-10 flex max-w-[500px] flex-col items-center text-center",
                className,
            )}
        />
    );
}
