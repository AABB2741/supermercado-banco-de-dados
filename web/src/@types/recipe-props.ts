import { IngredientProps } from "./ingredient-props";
import { UserProps } from "./user-props";

export type RecipeProps = {
    id: number;
    name: string;
    description: string;
    content: string;
    createdAt: Date;
    ingredients: IngredientProps[];
    userId: number;
    user: UserProps;
};
