// import { Flag, MessageCircle, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { useRecipe } from "../../contexts/RecipeProvider";

import { LinkableText } from "../../components/LinkableText";
import { Ingredient } from "../../components/Ingredient";
import { Footer } from "../../components/Footer";

import listBanner from "../../assets/list-banner.jpg";
import { Preparation } from "../../components/Preparation";

export function Recipe() {
    const { recipe } = useRecipe();

    useEffect(() => {
        document.title = `${recipe.name} - Receitas - RPB Shopping`;
    }, [recipe]);

    return (
        <div>
            <div className="relative flex min-h-[300px] flex-col items-end justify-end">
                <img
                    src={recipe.thumbnail || listBanner}
                    className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full object-cover object-top brightness-50"
                />

                <div className="relative z-10 p-8 text-white">
                    <Link
                        className="mb-6 inline-block rounded-full bg-black/50 p-3"
                        to="/dashboard"
                    >
                        <ChevronLeft size={18} />
                    </Link>
                    <h1 className="text-4xl font-black">{recipe.name}</h1>
                    <p className="my-2 leading-relaxed">{recipe.description}</p>
                    {/* <div className="flex items-center justify-between gap-6">
                        <div className="flex flex-1 items-center gap-3 overflow-x-auto bg-red-200 text-black dark:text-white">
                            <div
                                className="flex items-center gap-2 overflow-x-hidden rounded-full bg-white px-3 py-1 text-sm dark:bg-zinc-900"
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
                    </div> */}
                </div>
            </div>
            <div className="p-6">
                <LinkableText
                    text={`Ingredientes (${recipe.ingredientPortion} ${
                        recipe.ingredientPortion === 1 ? "porção" : "porções"
                    })`}
                    id="ingredients"
                />
                <p
                    className="my-6 text-center text-xl font-bold text-green-500"
                    hidden={
                        !recipe.ingredients.every(
                            (ingredient) => ingredient.has >= ingredient.amount,
                        )
                    }
                >
                    Você tem todos os ingredientes necessários para fazer essa
                    receita!
                </p>
                <div className="mb-8 grid grid-cols-1 gap-12 pt-4 md:grid-cols-2 xl:grid-cols-3">
                    {recipe.ingredients.map((ingredient) => (
                        <Ingredient
                            productId={ingredient.productId}
                            name={ingredient.product.name}
                            required={ingredient.amount}
                            has={ingredient.has}
                            key={ingredient.id}
                        />
                    ))}
                </div>
                <LinkableText id="preparation" text="Modo de preparo" />
                <div className="mt-4 flex flex-col gap-4">
                    {recipe.preparation.map((preparation) => (
                        <Preparation {...preparation} key={preparation.id} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
