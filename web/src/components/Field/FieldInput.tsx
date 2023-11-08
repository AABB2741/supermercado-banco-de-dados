type FieldInputProps = React.ComponentProps<"input">;

export function FieldInput({ ...rest }: FieldInputProps) {
    return (
        <input
            {...rest}
            className="min-w-0 flex-1 rounded-br-md bg-transparent pl-2 text-xs outline-none transition-shadow focus:shadow-input"
        />
    );
}
