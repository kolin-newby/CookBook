import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SBClient } from "./../../supabaseClient";

const addRecipe = async ({ recipe }) => {
  const { data, error } = await SBClient.from("recipes").insert([
    {
      title: recipe.title,
      description: recipe.description,
      prepTimeMins: recipe.prepTimeMins,
      notes: recipe.notes,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      active: recipe.active,
    },
  ]);

  if (error) throw error;
  return data ?? "New recipe not returned...";
};

const UseCreateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export default UseCreateRecipeMutation;
