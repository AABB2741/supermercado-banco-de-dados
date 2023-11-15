type EmptyImageProps = React.ComponentProps<"img">;

export function EmptyImage(props: EmptyImageProps) {
    return <img {...props} className="mx-auto w-1/2" />;
}
