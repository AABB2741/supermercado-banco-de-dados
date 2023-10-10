import { useEffect } from "react";
import { LucideProps } from "lucide-react";
import { Combobox } from "@headlessui/react";

import { getProducts } from "../../services/products/getProducts";

import banner from "../../assets/list-banner.jpg";

interface AddItemCategoryProps {
    icon: React.ElementType<LucideProps>;
    title: string;
    search: string;
    url: string;
}

export function AddItemCategory({
    icon: Icon,
    title,
    search,
    url,
}: AddItemCategoryProps) {
    return (
        <>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 dark:bg-zinc-800">
                <Icon size={12} />
                <span className="text-xs">{title}</span>
            </div>
            <div className="p-2">
                <Combobox.Option
                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                    value={2}
                >
                    <img src={banner} className="h-8 w-8 rounded-lg" />
                    <div className="flex-1">
                        <p>Macarrão</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400">
                            Bosch
                        </p>
                    </div>
                    <span className="text-sm text-green-500">R$389,90</span>
                </Combobox.Option>
            </div>
        </>
    );
}
