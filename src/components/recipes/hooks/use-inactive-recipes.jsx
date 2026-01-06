import { useQuery } from "@tanstack/react-query";
import { SBClient } from "../../supabaseClient";

const queryInactiveRecipes = async () => {
  const { data, error } = await SBClient.from("recipes")
    .select("*")
    .eq("active", false);

  if (error) throw error;
  return data ?? [];
};

const UseInactiveRecipes = ({ queryEnabled = true }) => {
  return useQuery({
    queryKey: ["recipes", "inactive"],
    queryFn: queryInactiveRecipes,
    enabled: queryEnabled,
  });
};
export default UseInactiveRecipes;
