import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SBClient } from "./../../supabaseClient";

const updateRecipe = async ({ recipeId, partialRecipe }) => {
  const { data, error } = await SBClient.from("recipes")
    .update(partialRecipe)
    .eq("id", recipeId)
    .select();

  if (error) throw error;
  return data ?? "Updated recipe not returned...";
};

const UseUpdateRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};

export default UseUpdateRecipeMutation;
