import { ProductProps } from "./product-props";
import { RecipeProps } from "./recipe-props";

export type IngredientUnit = "mg" | "g" | "kg" | "ml" | "l";

export type IngredientProps = {
    id: number;
    amount: number;
    amountUnit: IngredientUnit;
    productId: number;
    product: ProductProps;
    recipeId: number;
    recipe: RecipeProps;
};
