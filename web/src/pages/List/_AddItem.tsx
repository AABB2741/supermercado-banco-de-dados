import { useMemo, useState } from "react";
import { AlertTriangle, ShoppingCart, Sparkles } from "lucide-react";
import { Combobox } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";
// import * as Checkbox from "@radix-ui/react-checkbox";

import { useList } from "../../contexts/ListProvider";

import { AddItemCategory } from "./AddItemCategory";
import { Button } from "../../components/Button";

import { ProductProps } from "../../@types/product-props";

import banner from "../../assets/list-banner.jpg";
import { Input } from "../../components/Input";

interface AddItemProps {
    children: React.ReactNode;
}

export function AddItem({ children }: AddItemProps) {
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const src = useMemo(() => search.trim(), [search]);

    const [selectedItem, setSelectedItem] =
        useState<Omit<ProductProps & { isCustom?: boolean }, "userId">>();
    const selectedId = useMemo(
        () => selectedItem?.id ?? null,
        [selectedItem?.id],
    );
    const [amount, setAmount] = useState(1);
    // const [isPublic, setIsPublic] = useState(true);

    const { list } = useList();

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content
                    className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100"
                    onClick={() =>
                        setSelectedItem({
                            id: new Date().getTime(),
                            name: src,
                            price: 0,
                        })
                    }
                >
                    <Dialog.Title className="mb-4 text-lg font-bold">
                        Adicionar item
                    </Dialog.Title>

                    <Combobox value={selectedId}>
                        <Combobox.Input
                            className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                            placeholder="Desinfetante, carne moída..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                            <div
                                className="p-2 data-[empty=true]:hidden"
                                data-empty={!src}
                            >
                                <Combobox.Option
                                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                                    value={2}
                                >
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                                        style={{
                                            backgroundColor:
                                                list?.color ?? "#1e90ff",
                                        }}
                                    >
                                        {src[0]}
                                    </span>
                                    <p>{search}</p>
                                </Combobox.Option>
                            </div>
                            <AddItemCategory
                                icon={Sparkles}
                                title="Sugestões para você"
                                search={src}
                                url=""
                                setSelectedItem={setSelectedItem}
                            />
                            <AddItemCategory
                                icon={AlertTriangle}
                                title="Está acabando da sua dispensa"
                                search={src}
                                url=""
                                setSelectedItem={setSelectedItem}
                            />
                            <AddItemCategory
                                icon={ShoppingCart}
                                title="Todos os produtos"
                                search={src}
                                url=""
                                setSelectedItem={setSelectedItem}
                            />
                        </Combobox.Options>
                    </Combobox>

                    {/* Item infos */}
                    <p className="mt-4 text-lg font-bold">Sobre este produto</p>
                    <div className="mt-2 flex gap-4">
                        <img src={banner} className="h-14 w-14 rounded-lg" />
                        <div className="flex-1">
                            <p className="text-xl font-bold">
                                {selectedItem?.name}
                            </p>
                            {selectedItem?.user && (
                                <p>Vendido por: {selectedItem.user.name}</p>
                            )}
                            {selectedItem?.brand && (
                                <p>Marca: {selectedItem.brand.name}</p>
                            )}
                            <p>Vence em 3 dias (11/10/2023)</p>
                            {typeof selectedItem?.price === "number" && (
                                <p>
                                    Unidade: R$
                                    {selectedItem.price
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Amount selector */}
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
                            onChange={(e) =>
                                setAmount(parseInt(e.target.value))
                            }
                        />
                        <span className="font-bold text-red-500">
                            R$
                            {(!isNaN((selectedItem?.price ?? 0) * amount)
                                ? (selectedItem?.price ?? 0) * amount
                                : 0
                            )
                                .toFixed(2)
                                .replace(".", ",")}
                        </span>
                    </div>

                    {/* Public checkbox */}
                    {/* <div className="mt-4 flex items-center gap-3">
                        <Checkbox.Root
                            id="public"
                            className="flex h-5 w-5 items-center justify-center rounded border border-gray-300 bg-white"
                            defaultChecked
                        >
                            <Checkbox.Indicator>
                                {isPublic && <Check size={14} />}
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor="public">
                            Tornar este produto público
                        </label>
                    </div> */}

                    <div className="mt-4 flex items-center justify-end gap-2">
                        <Dialog.Close
                            className="px-4 font-bold"
                            disabled={loading}
                        >
                            Cancelar
                        </Dialog.Close>
                        <Button.Normal accent loading={loading}>
                            Adicionar item
                        </Button.Normal>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
