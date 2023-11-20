import { PreparationProps } from "../@types/preparation-props";

export function Preparation({ step, title, content }: PreparationProps) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-lg p-6 shadow-lg dark:bg-zinc-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border text-xs dark:border-zinc-700">
                {step}
            </span>
            <div className="flex-1">
                {title && <p className="text-lg font-bold">{title}</p>}
                <p>{content}</p>
            </div>
        </div>
    );
}
