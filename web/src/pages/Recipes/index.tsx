import { useEffect, useState } from "react";
import axios from "axios";

import { FeaturedRecipes } from "./FeaturedRecipes";
import { Category } from "../../components/Category";
import { Recipe } from "../../components/Recipe";

import {
    getSuggestedRecipes,
    SuggestedRecipe,
} from "../../services/recipe/getSuggestedRecipes";

export function Recipes() {
    const [suggestedRecipes, setSuggestedRecipes] =
        useState<SuggestedRecipe[]>();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        getSuggestedRecipes(cancelToken.token)
            .then((res) => setSuggestedRecipes(res))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    console.error("Erro ao carregar listas sugeridas:", err);
                }
            });

        return cancelToken.cancel;
    }, []);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <FeaturedRecipes />
            <Category
                className="mt-4 data-[empty=true]:hidden"
                title="Receitas sugeridas para você"
                description="Essas são as receitas escolhidas especialmente para você. Você tem todos os ingredientes necessários para fazê-las."
                data-empty={suggestedRecipes && suggestedRecipes.length === 0}
            >
                <div className="mt-4 flex items-center">
                    {suggestedRecipes?.map((recipe) => (
                        <Recipe key={recipe.id} {...recipe} />
                    ))}
                </div>
            </Category>
        </div>
    );
}
