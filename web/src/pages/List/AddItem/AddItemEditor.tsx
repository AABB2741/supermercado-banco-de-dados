import { useState, forwardRef, useImperativeHandle } from "react";
import * as Slider from "@radix-ui/react-slider";

import { Input } from "../../../components/Input";

import { useAddItem } from "./AddItemRoot";

type EditorHandle = {
    amount: number;
};

export const AddItemEditor = forwardRef<EditorHandle>((_, ref) => {
    const [amount, setAmount] = useState(1);

    const { product } = useAddItem();

    useImperativeHandle(ref, () => ({
        amount,
    }));

    if (!product) return null;

    return (
        <div>
            <p className="mb-2 mt-4 text-lg font-bold">Quantidade</p>
            <Slider.Root
                className="relative flex h-2 select-none items-center"
                defaultValue={[1]}
                min={1}
                max={100}
                value={[!isNaN(amount) ? amount : 0]}
                onValueChange={(value) => setAmount(value[0])}
            >
                <Slider.Track className="relative h-2 flex-grow overflow-hidden rounded-full bg-gray-400 dark:bg-zinc-600">
                    <Slider.Range className="absolute h-full bg-white dark:bg-sky-500" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow-md dark:bg-sky-500" />
            </Slider.Root>
            <div className="mt-4 flex items-center justify-between">
                <Input
                    type="number"
                    value={!isNaN(amount) ? amount : 0}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    min={1}
                />
                {product.price ? (
                    <span className="font-bold text-red-500">
                        R$
                        {(product.price * amount).toFixed(2).replace(".", ",")}
                    </span>
                ) : (
                    <span className="font-bold text-red-500">R$0,00</span>
                )}
            </div>
        </div>
    );
});
