type FieldLabelProps = {
    children: React.ReactNode;
};

export function FieldLabel({ children }: FieldLabelProps) {
    return (
        <div className="flex items-center border-r px-2 py-1 dark:border-zinc-700">
            {children}
        </div>
    );
}
