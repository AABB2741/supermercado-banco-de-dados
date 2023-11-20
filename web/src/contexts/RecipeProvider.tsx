import { createContext, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DotSpinner } from "@uiball/loaders";
import axios from "axios";

import { fetchRecipe } from "../services/recipe/fetchRecipe";

import { RecipeProps } from "../@types/recipe-props";

interface RecipeProviderValue {
    recipe: RecipeProps;
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

        fetchRecipe(recipeId, cancelToken.token)
            .then((res) => {
                setRecipe(res);
            })
            .catch((err) => {
                if (!axios.isCancel(err)) {
                    console.error("Ocorreu um erro ao obter a lista:", err);
                }
            });

        return cancelToken.cancel;
    }, [id]);

    if (!recipe) {
        return (
            <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
                <DotSpinner color="currentColor" />
                <span>Carregando receita...</span>
            </div>
        );
    }

    return (
        <RecipeContext.Provider value={{ recipe }}>
            {children}
        </RecipeContext.Provider>
    );
}

export const useRecipe = () => useContext(RecipeContext);
