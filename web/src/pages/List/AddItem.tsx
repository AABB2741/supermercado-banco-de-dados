import { useEffect, useState } from "react";
import { AlertTriangle, ShoppingCart, Sparkles } from "lucide-react";
import { Combobox } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Slider from "@radix-ui/react-slider";

import { useDebounce } from "../../hooks/useDebounce";
import { useList } from "../../contexts/ListProvider";
import { getProducts } from "../../services/products/getProducts";

import { AddItemCategory } from "./AddItemCategory";
import { Button } from "../../components/Button";

import banner from "../../assets/list-banner.jpg";

import { ProductProps } from "../../@types/product-props";

interface AddItemProps {
    children: React.ReactNode;
}

export function AddItem({ children }: AddItemProps) {
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [products, setProducts] = useState<ProductProps[]>();
    const [selectedItem, setSelectedItem] = useState();
    const [amount, setAmount] = useState(0);

    const { list } = useList();

    useEffect(() => {
        getProducts(search).then((products) => setProducts(products));
    }, [search]);

    useDebounce(
        () => {
            getProducts(search).then((products) => setProducts(products));
        },
        3000,
        [search],
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>{children}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-gray-300 bg-gray-200 p-6 shadow-lg outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100">
                    <Dialog.Title className="mb-4 text-lg font-bold">
                        Adicionar item
                    </Dialog.Title>

                    <Combobox>
                        <Combobox.Input
                            className="block w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-none outline-none ring-0 transition-shadow focus:shadow-input focus:ring-0 focus:ring-transparent dark:border-zinc-700 dark:bg-zinc-900"
                            placeholder="Desinfetante, carne moída..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Combobox.Options className="absolute top-[107px] z-10 mt-2 max-h-[calc(100%-139px)] w-[calc(100%-48px)] overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                            <div
                                className="p-2 data-[empty=true]:hidden"
                                data-empty={!search}
                            >
                                <Combobox.Option
                                    className="flex cursor-pointer items-center justify-start gap-3 rounded-lg px-4 py-2 hover:bg-sky-200 dark:hover:bg-sky-800"
                                    value={2}
                                >
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                                        style={{
                                            backgroundColor:
                                                list?.color ?? "#1e90ff",
                                        }}
                                    >
                                        {search[0]}
                                    </span>
                                    <p>{search}</p>
                                </Combobox.Option>
                            </div>
                            <AddItemCategory
                                icon={Sparkles}
                                title="Sugestões para você"
                                search={search}
                                url=""
                            />
                            <AddItemCategory
                                icon={AlertTriangle}
                                title="Está acabando da sua dispensa"
                                search={search}
                                url=""
                            />
                            <AddItemCategory
                                icon={ShoppingCart}
                                title="Todos os produtos"
                                search={search}
                                url=""
                            />
                        </Combobox.Options>
                    </Combobox>

                    {/* Item infos */}
                    <p className="mt-4 text-lg font-bold">Sobre este produto</p>
                    <div className="mt-2 flex gap-4">
                        <img src={banner} className="h-14 w-14 rounded-lg" />
                        <div className="flex-1">
                            <p className="text-xl font-bold">Macarrão</p>
                            <p>Vendido por: Amazon</p>
                            <p>Marca: Bosch</p>
                            <p>Vence em 3 dias (11/10/2023)</p>
                            <p>Unidade: R$854,39</p>
                        </div>
                    </div>

                    <p className="mb-2 mt-4 text-lg font-bold">Quantidade</p>
                    <Slider.Root
                        className="relative flex h-2 select-none items-center"
                        defaultValue={[1]}
                        min={1}
                        max={100}
                        onValueChange={(value) => setAmount(value[0])}
                    >
                        <Slider.Track className="relative h-2 flex-grow overflow-hidden rounded-full bg-gray-400 dark:bg-zinc-600">
                            <Slider.Range className="absolute h-full bg-white dark:bg-sky-500" />
                        </Slider.Track>
                        <Slider.Thumb className="block h-5 w-5 rounded-full bg-white shadow-md dark:bg-sky-500" />
                    </Slider.Root>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="rounded-lg border px-2 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                            {amount}
                        </span>
                        <span className="text-green font-bold">R$0,00</span>
                    </div>

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
