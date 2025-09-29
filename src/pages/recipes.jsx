import React, { useEffect, useState } from "react";
import { QueryRecipes } from "../components/recipes/hooks";

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    QueryRecipes().then((resp) => {
      if (resp.error) console.error(resp.error);
      else setRecipes(resp.data);
    });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="w-2/3 h-full space-y-4">
      <ul className="flex flex-col space-y-4 w-max text-yellow-950">
        <li className="flex p-1 rounded-full bg-yellow-950/10 inset-shadow-sm w-full">
          <input
            className="flex rounded-full text-lg py-2 px-6 w-full"
            type="text"
            placeholder="search recipes..."
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
          />
        </li>
        {recipes.map(
          (recipe, index) =>
            search !== "<empty string>" &&
            (recipe?.title?.includes(search) ||
              search.includes(recipe?.title)) && (
              <li
                key={`recipe-item-${index}-${recipe.title}`}
                className="flex flex-row rounded-full inset-shadow-sm p-1 space-x-4 items-center justify-center transition-all duration-300 cursor-pointer bg-yellow-950/10 hover:scale-[103%] hover:bg-transparent hover:inset-shadow-none hover:shadow"
              >
                <div className="flex flex-row rounded-full items-center justify-center py-3 pl-12 pr-3 space-x-6">
                  <div className="flex flex-col space-y-2">
                    <h2 className="flex text-3xl">{recipe?.title}</h2>
                    <div className="flex bg-yellow-950 rounded-full w-full h-0.5" />
                    <h3 className="flex">{recipe?.description}</h3>
                  </div>
                  <img
                    className="flex rounded-full w-[200px]"
                    src="/photos/placeholder.jpg"
                  />
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default Recipes;
