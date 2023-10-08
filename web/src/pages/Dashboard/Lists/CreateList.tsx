import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import z from "zod";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

import { createList } from "../../../services/list/createList";

import { ErrorCode } from "../../../errors/AppError";

const colors = [
    "#ff6b6b",
    "#da77f2",
    "#9775fa",
    "#5c7cfa",
    "#66d9e8",
    "#8ce99a",
    "#ffd43b",
    "#ff922b",
];

export function CreateList() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ErrorCode>();
    const [color, setColor] = useState(
        colors[Math.round(Math.random() * (colors.length - 1))],
    );

    const nameRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const navigate = useNavigate();

    async function handleCreateList() {
        setLoading(true);
        setError(undefined);

        try {
            const name = z.string().parse(nameRef.current?.value);
            const listId = await createList({ name, color });
            navigate("/dashboard/lists/" + listId);
        } catch (err) {
            console.error(err);
            setError("unknown_error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className="font-white flex items-center justify-center gap-4 rounded-lg bg-gradient-to-br from-green-400 to-green-600 px-10 py-6 font-bold text-gray-100">
                <Plus />
                <span>Criar nova lista</span>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed bottom-0 left-0 right-0 top-0 bg-black/25" />
                <Dialog.Content className="bottom fixed left-1/2 top-1/2 max-h-[calc(100vh-48px)] w-[calc(100vw-48px)] max-w-[600px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-zinc-700 bg-gray-200 p-6 shadow-lg outline-none dark:bg-zinc-800 dark:text-gray-100">
                    <Dialog.Title className="text-lg font-bold">
                        Criar nova lista
                    </Dialog.Title>
                    <Dialog.Description className="mb-4 mt-2">
                        Crie agora uma nova lista para auxiliar nas suas
                        compras, com a mágica do RPB Shopping.
                    </Dialog.Description>
                    <Input
                        label="Nome da lista"
                        placeholder="Compras do mês"
                        autoFocus
                        ref={nameRef}
                        disabled={loading}
                        nextFocus={submitRef}
                    />
                    <p className="my-2">Cor da lista</p>
                    <div className="flex items-center gap-2">
                        {colors.map((c) => (
                            <button
                                key={c}
                                className="h-5 w-5 rounded-full outline-none data-[selected=true]:ring-2 data-[selected=true]:ring-sky-500"
                                data-selected={color === c}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                                disabled={loading}
                            />
                        ))}
                    </div>
                    {error && (
                        <p className="my-2 text-center text-sm text-red-400">
                            {error}
                        </p>
                    )}
                    <div className="mt-4 flex items-center justify-end gap-2">
                        <Dialog.Close
                            className="px-4 font-bold"
                            disabled={loading}
                        >
                            Cancelar
                        </Dialog.Close>
                        <Button.Normal
                            accent
                            loading={loading}
                            ref={submitRef}
                            onClick={handleCreateList}
                        >
                            Criar lista
                        </Button.Normal>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
