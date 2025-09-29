import { SBClient } from "../supabaseClient";

export const QueryRecipes = async (searchTerm = null) => {
  if (searchTerm) {
    return await SBClient.from("recipes")
      .select("*")
      .like("title", `%${searchTerm}%`);
  }

  return await SBClient.from("recipes").select("*");
};
