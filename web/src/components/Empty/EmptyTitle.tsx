type EmptyTitleProps = React.ComponentProps<"h1">;

export function EmptyTitle(props: EmptyTitleProps) {
    return <h1 {...props} className="text-center text-lg font-bold" />;
}
