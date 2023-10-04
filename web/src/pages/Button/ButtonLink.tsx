import { Link, LinkProps } from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
    accent?: boolean;
}

export function ButtonLink({ accent, ...props }: ButtonLinkProps) {
    return (
        <Link
            {...props}
            className="block rounded-lg px-4 py-2 text-center font-bold data-[accent=true]:bg-yellow-400"
            data-accent={accent}
        />
    );
}
