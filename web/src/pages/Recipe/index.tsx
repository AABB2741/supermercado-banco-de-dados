import { useRecipe } from "../../contexts/RecipeProvider";

export function Recipe() {
    const { recipe } = useRecipe();

    return (
        <div className="p-8">
            <h1 className="text-4xl font-black">{recipe.name}</h1>
        </div>
    );
}
