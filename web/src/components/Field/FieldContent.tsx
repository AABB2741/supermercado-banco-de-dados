type FieldContentProps = {
    children: React.ReactNode;
};

export function FieldContent({ children }: FieldContentProps) {
    return (
        <div className="flex items-stretch rounded-md border border-gray-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
            {children}
        </div>
    );
}
