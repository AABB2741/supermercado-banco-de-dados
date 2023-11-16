import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { fetchRecipe } from "../services/recipe/fetchRecipe";

import { RecipeProps } from "../@types/recipe-props";

interface RecipeProviderValue {
    recipe?: RecipeProps;
}

interface RecipeProviderProps {
    children: React.ReactNode;
}

const RecipeContext = createContext({} as RecipeProviderValue);

export function RecipeProvider({ children }: RecipeProviderProps) {
    const [recipe, setRecipe] = useState<RecipeProps>();

    const { id } = useParams();

    useEffect(() => {
        const recipeId = typeof id === "string" ? parseInt(id) : null;

        if (!recipeId || isNaN(recipeId)) return;

        const cancelToken = axios.CancelToken.source();

        fetchRecipe(recipeId, cancelToken.token).then((res) => {
            setRecipe(res);
        });

        return cancelToken.cancel;
    }, [id]);

    return (
        <RecipeContext.Provider value={{ recipe }}>
            {children}
        </RecipeContext.Provider>
    );
}

export const useRecipe = () => useContext(RecipeContext);
