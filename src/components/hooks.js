import { SBClient } from "./supabaseClient";

export const QueryActiveRecipes = async () => {
  return await SBClient.from("recipes").select("*").eq("active", true);
};

export const QueryInactiveRecipes = async () => {
  return await SBClient.from("recipes").select("*").eq("active", false);
};

export const AddRecipe = async (recipe) => {
  return await SBClient.from("recipes").insert([
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
};

export const DeleteRecipe = async (recipeId) => {
  return await SBClient.from("recipes").delete().eq("id", recipeId);
};

export const UpdateRecipe = async (recipeId, partialRecipe) => {
  return await SBClient.from("recipes")
    .update(partialRecipe)
    .eq("id", recipeId)
    .select();
};
