import { Link, LinkProps } from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
    accent?: boolean;
    disabled?: boolean;
}

export function ButtonLink({ accent, disabled, ...props }: ButtonLinkProps) {
    return (
        <Link
            {...props}
            className="block rounded-lg px-4 py-2 text-center font-bold data-[disabled=true]:pointer-events-none data-[accent=true]:bg-yellow-400 data-[disabled=true]:opacity-50"
            data-accent={accent}
            data-disabled={disabled}
        />
    );
}
