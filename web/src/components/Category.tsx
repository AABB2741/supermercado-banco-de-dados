interface CategoryProps extends React.ComponentProps<"div"> {
    title: string;
    description?: string;
}

export function Category({
    title,
    description,
    children,
    ...rest
}: CategoryProps) {
    return (
        <div {...rest}>
            <h2 className="text-xl font-bold">{title}</h2>
            {description && <p className="text-sm">{description}</p>}
            {children}
        </div>
    );
}
