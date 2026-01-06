import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SBClient } from "./../../supabaseClient";

const deleteRecipe = async (recipeId) => {
  const { data, error } = await SBClient.from("recipes")
    .delete()
    .eq("id", recipeId);

  if (error) throw error;
  return data ?? "New recipe not returned...";
};

const UseDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export default UseDeleteRecipeMutation;
