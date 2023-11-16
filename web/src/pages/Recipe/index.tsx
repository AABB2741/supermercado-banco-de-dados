import { DotSpinner } from "@uiball/loaders";

import { useRecipe } from "../../contexts/RecipeProvider";

export function Recipe() {
    const { recipe } = useRecipe();

    if (!recipe) {
        return (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
                <DotSpinner color="currentColor" />
                <span>Carregando receita...</span>
            </div>
        );
    }

    return <h1>Recipe {recipe.id}</h1>;
}
