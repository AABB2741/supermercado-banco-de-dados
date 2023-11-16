import { IngredientProps } from "./ingredient-props";
import { PreparationProps } from "./preparation-props";
import { UserProps } from "./user-props";

export type RecipeProps = {
    id: number;
    thumbnail: string;
    name: string;
    description: string;
    createdAt: Date;
    ingredientPortion: number;
    ingredients: IngredientProps[];
    userId: number;
    user: UserProps;
    preparation: PreparationProps[];
};
