import React, { useState } from "react";
import PlaceHolderImage from "../place-holder-image";
import MutationBar from "./mutation-bar";
import RecipeModal from "../recipe-modal";
import { useAuth } from "../auth/AuthContext";

const RecipesList = ({ setModalOpen, setDisplayRecipe, recipes }) => {
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  return (
    <div
      className={`inset-0 flex absolute w-full h-full items-start justify-center p-8`}
    >
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
        {recipes.filter(
          (recipe) =>
            recipe?.title?.toLowerCase().includes(search.toLowerCase()) ||
            search.toLowerCase().includes(recipe?.title?.toLowerCase())
        ).length > 0 ? (
          recipes
            .filter(
              (recipe) =>
                recipe?.title?.toLowerCase().includes(search.toLowerCase()) ||
                search.toLowerCase().includes(recipe?.title?.toLowerCase())
            )
            .map(
              (recipe, index) =>
                search !== "<empty string>" && (
                  <li
                    key={`recipe-item-${index}-${recipe.title}`}
                    className="flex flex-col"
                  >
                    <div
                      className="flex flex-row rounded-full inset-shadow-sm p-1 space-x-4 items-center justify-center transition-all duration-300 cursor-pointer bg-yellow-950/10 hover:scale-[103%] hover:bg-transparent hover:inset-shadow-none hover:shadow"
                      onClick={() => {
                        setDisplayRecipe(recipe);
                        setModalOpen(true);
                      }}
                    >
                      <div className="flex flex-row w-full rounded-full items-center justify-between py-3 pl-12 pr-3 space-x-6">
                        <div className="flex flex-col space-y-2">
                          <h2 className="flex text-3xl">{recipe?.title}</h2>
                          <div className="flex bg-yellow-950 rounded-full w-full h-0.5" />
                          <h3 className="flex">{recipe?.description}</h3>
                        </div>
                        <PlaceHolderImage className="w-[200px]" />
                      </div>
                    </div>
                    {user && <MutationBar recipe={recipe} />}
                  </li>
                )
            )
        ) : (
          <li
            key={`recipe-item-not-found`}
            className="flex flex-row p-10 space-x-4 items-center justify-center"
          >
            <div className="flex flex-row items-center justify-center py-3 pl-12 pr-3 space-x-6">
              There is no recipe that matches your search...
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecipesList;
