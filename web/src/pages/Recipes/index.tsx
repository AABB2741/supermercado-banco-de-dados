import { useState } from "react";

import { FeaturedRecipes } from "./FeaturedRecipes";
import { Category } from "../../components/Category";
import { Recipe } from "../../components/Recipe";

import { RecipeProps } from "../../@types/recipe-props";

import { recipeTest } from "../../tests/recipe.test";

export function Recipes() {
    const [suggestedRecipes, setSuggestedRecipes] = useState<RecipeProps[]>([
        recipeTest,
    ]);

    console.log(suggestedRecipes);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <FeaturedRecipes />
            <Category
                className="mt-4"
                title="Receitas sugeridas para você"
                description="Essas são as receitas escolhidas especialmente para você. Você tem todos os ingredientes necessários para fazê-las."
            >
                <div className="mt-4 flex items-center">
                    {suggestedRecipes.map((recipe) => (
                        <Recipe key={recipe.id} {...recipe} />
                    ))}
                </div>
            </Category>
        </div>
    );
}
