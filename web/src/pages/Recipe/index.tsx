import { Flag, MessageCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";

import { useRecipe } from "../../contexts/RecipeProvider";

import { LinkableText } from "../../components/LinkableText";

export function Recipe() {
    const { recipe } = useRecipe();

    return (
        <div>
            <div className="relative flex min-h-[300px] items-end">
                <img
                    src={recipe.thumbnail}
                    className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full object-cover object-top brightness-50"
                />

                <div className="relative z-10 p-8 text-white">
                    <h1 className="text-4xl font-black">{recipe.name}</h1>
                    <p className="my-2 leading-relaxed">{recipe.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-black dark:text-white">
                            <div
                                className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm dark:bg-zinc-900"
                                title="Avaliação média"
                            >
                                <Star size={14} />
                                4.3 (128)
                            </div>
                            <div
                                className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm dark:bg-zinc-900"
                                title="Comentários"
                            >
                                <MessageCircle size={14} />
                                120
                            </div>
                            <button
                                className="flex items-center gap-2 rounded-full bg-white bg-gradient-to-br px-3 py-1 text-sm data-[active=true]:from-sky-400 data-[active=true]:to-blue-600 data-[active=true]:text-white dark:bg-zinc-900"
                                title="Gostei"
                                data-active={true}
                            >
                                <ThumbsUp size={14} />
                                1722
                            </button>
                            <button
                                className="flex items-center gap-2 rounded-full bg-white bg-gradient-to-br px-3 py-1 text-sm data-[active=true]:from-red-400 data-[active=true]:to-red-600 data-[active=true]:text-white dark:bg-zinc-900"
                                title="Não gostei"
                                data-active={false}
                            >
                                <ThumbsDown size={14} />
                                113
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button title="Denunciar receita">
                                <Flag size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <LinkableText text="Ingredientes" id="ingredients" />
            </div>
        </div>
    );
}
