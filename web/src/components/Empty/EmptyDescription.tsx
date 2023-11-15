type EmptyDescriptionProps = React.ComponentProps<"h1">;

export function EmptyDescription(props: EmptyDescriptionProps) {
    return <h1 {...props} className="text-center" />;
}
