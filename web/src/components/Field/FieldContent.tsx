type FieldContentProps = {
    children: React.ReactNode;
};

export function FieldContent({ children }: FieldContentProps) {
    return (
        <div className="flex w-[100px] items-stretch rounded-md border dark:border-zinc-700 dark:bg-zinc-900">
            {children}
        </div>
    );
}
