import { useQuery } from "@tanstack/react-query";
import { SBClient } from "../../supabaseClient";

const queryActiveRecipes = async () => {
  const { data, error } = await SBClient.from("recipes")
    .select("*")
    .eq("active", true);

  if (error) throw error;
  return data ?? [];
};

const UseActiveRecipes = () => {
  return useQuery({
    queryKey: ["recipes", "active"],
    queryFn: queryActiveRecipes,
  });
};
export default UseActiveRecipes;
