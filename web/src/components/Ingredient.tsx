import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { DotSpinner } from "@uiball/loaders";
import * as Popover from "@radix-ui/react-popover";
import axios from "axios";

import { useRecipe } from "../contexts/RecipeProvider";

import { getLists } from "../services/list/getLists";
import { normalize } from "../utils/normalize";

import { ListProps } from "../@types/list-props";

interface IngredientProps {
    productId: number;
    name: string;
    required: number;
    has: number;
}

export function Ingredient({ name, required, has }: IngredientProps) {
    const [lists, setLists] = useState<ListProps[]>();

    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const { recipe } = useRecipe();

    const hasEnough = has >= required;
    const normalizedSearch = normalize(search).toLowerCase();

    useEffect(() => {
        if (!open) return;

        const cancelToken = axios.CancelToken.source();

        setLoading(true);
        getLists(cancelToken.token).then((res) => {
            console.log(res);
            setLists(res);
            setLoading(false);
        });

        return cancelToken.cancel;
    }, [open]);

    async function handleAddIngredient(listId: number) {}

    return (
        <div className="flex items-center justify-between gap-6">
            <div>
                <p className="text-lg font-bold">{name}</p>
                <p className="text-sm dark:text-zinc-300">
                    Necessário: {required}
                </p>
                <p className="text-sm dark:text-zinc-300">Você tem: {has}</p>
            </div>
            <div className="flex items-center gap-4">
                <Check
                    size={18}
                    color="currentColor"
                    className="hidden text-green-500 data-[has-enough=true]:block"
                    data-has-enough={hasEnough}
                />
                <Popover.Root
                    open={open}
                    onOpenChange={!busy ? setOpen : undefined}
                >
                    <Popover.Trigger asChild>
                        <button className="rounded-full p-2 dark:bg-zinc-900">
                            <Plus size={18} />
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            side="bottom"
                            sideOffset={8}
                            className="rounded-lg bg-zinc-900 p-1 shadow-md dark:text-white"
                        >
                            <p className="p-2 text-left text-xs dark:text-zinc-400">
                                Selecione uma lista para adicionar {required}{" "}
                                {required === 1 ? "quantia" : "quantias"} de{" "}
                                <strong>{name}</strong>
                            </p>
                            <input
                                type="text"
                                className="mt-1 w-full min-w-0 rounded-md border p-2 text-sm outline-none transition-shadow focus:shadow-input dark:border-zinc-700 dark:bg-zinc-900"
                                placeholder="Procurar listas..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                            <button
                                className="my-1 flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm hover:bg-zinc-800"
                                title={`Criar uma lista com o nome "${recipe.name}"`}
                            >
                                <Plus size={14} />
                                <span>Nova lista</span>
                            </button>
                            {loading && (
                                <div className="my-2 flex flex-col items-center justify-center gap-2">
                                    <DotSpinner
                                        color="currentColor"
                                        size={12}
                                    />
                                    <span className="text-xs dark:text-zinc-400">
                                        Carregando listas...
                                    </span>
                                </div>
                            )}
                            {lists && lists.length === 0 && (
                                <span className="block text-center text-xs dark:text-zinc-400">
                                    Você ainda não tem listas :(
                                </span>
                            )}
                            <div className="flex flex-col items-stretch">
                                {lists
                                    ?.filter(
                                        (l) =>
                                            normalize(l.name)
                                                .toLowerCase()
                                                .includes(normalizedSearch) &&
                                            !l.checked,
                                    )
                                    .map((list) => (
                                        <button
                                            key={list.id}
                                            className="flex items-center justify-between gap-4 rounded-md px-2 py-1 text-sm dark:hover:bg-zinc-800"
                                        >
                                            <span className="flex-1 text-left">
                                                {list.name}
                                            </span>
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor: list.color,
                                                }}
                                            />
                                        </button>
                                    ))}
                            </div>
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </div>
    );
}
