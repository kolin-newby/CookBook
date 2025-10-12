import { SBClient } from "./supabaseClient";

export const QueryRecipes = async () => {
  return await SBClient.from("recipes").select("*");
};

export const AddRecipe = async (recipe) => {
  return await SBClient.from("recipes").insert([
    {
      title: recipe.title,
      description: recipe.description,
      prep_time_mins: recipe.prepTime,
      notes: recipe.notes,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
    },
  ]);
};

export const DeleteRecipe = async (recipeId) => {
  return await SBClient.from("recipes").delete().eq("id", recipeId);
};

export const UpdateRecipe = async (recipeId, partialRecipe) => {
  console.log(partialRecipe);
  return await SBClient.from("recipes")
    .update(partialRecipe)
    .eq("id", recipeId)
    .select();
};
