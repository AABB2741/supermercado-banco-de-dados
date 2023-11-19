import { Link } from "lucide-react";
import { twMerge } from "tailwind-merge";

type LinkableTextProps = {
    text: string;
    id: string;
} & Omit<React.ComponentProps<"button">, "onClick" | "id">;

export function LinkableText({ text, id, ...rest }: LinkableTextProps) {
    const url = `${location.protocol}//${location.host}${location.pathname}#${id}`;

    function handleCopyURL() {
        navigator.clipboard.writeText(url).catch((err) => {
            alert(
                `Não foi possível copiar a URL. Talvez seu navegador não tenha suporte a esse recurso.\n\nURL: ${url}`,
            );
            console.error(err);
        });
    }

    return (
        <button
            {...rest}
            className={twMerge(
                "group flex items-center gap-4 text-left",
                rest.className,
            )}
            title="Copiar URL"
            onClick={handleCopyURL}
            id={id}
        >
            <h2 className="text-2xl font-bold">{text}</h2>
            <Link className="invisible group-hover:visible" />
        </button>
    );
}
