import { useEffect, useState } from "react";
import axios from "axios";

import { FeaturedRecipes } from "./FeaturedRecipes";
import { Category } from "../../components/Category";
import { Recipe } from "../../components/Recipe";

import { RecipesData, getRecipes } from "../../services/recipe/getRecipes";

export function Recipes() {
    const [recipes, setRecipes] = useState<RecipesData>();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();

        getRecipes(cancelToken.token)
            .then((res) => setRecipes(res))
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    console.error("Erro ao carregar listas sugeridas:", err);
                }
            });

        return cancelToken.cancel;
    }, []);
    console.log(recipes);
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <FeaturedRecipes />
            <Category
                className="mt-4 data-[empty=true]:hidden"
                title="Receitas sugeridas para você"
                description="Essas são as receitas escolhidas especialmente para você. Você tem todos os ingredientes necessários para fazê-las."
                data-empty={
                    recipes?.suggested && recipes?.suggested.length === 0
                }
            >
                <div className="mt-4 flex items-center gap-4">
                    {recipes?.suggested?.map((recipe) => (
                        <Recipe
                            className="h-48 w-48"
                            key={recipe.id}
                            {...recipe}
                        />
                    ))}
                </div>
            </Category>
            <Category title="Todas as receitas" className="mt-6">
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {recipes?.recipes?.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            {...recipe}
                            className="h-[1fr] w-[1fr]"
                        />
                    ))}
                </div>
            </Category>
        </div>
    );
}
