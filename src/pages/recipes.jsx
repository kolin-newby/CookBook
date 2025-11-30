import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import RecipeDetails from "../components/recipes/recipe-details";
import { QueryRecipes } from "../components/hooks";
import RecipesList from "../components/recipes/recipes-list";
import { useAuth } from "../components/auth/AuthContext";

const Recipes = () => {
  const [displayRecipe, setDisplayRecipe] = useState(null);
  const [changedHash, setChangedHash] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [loadingList, setLoadingList] = useState(false);

  const { isAdmin } = useAuth();
  const { mode } = useParams();

  const fetchRecipes = useCallback(() => {
    setLoadingList(true);
    QueryRecipes()
      .then((resp) => {
        if (resp.error) console.error(resp.error);
        else setRecipes(resp.data);
      })
      .finally(() => {
        setLoadingList(false);
      });
  }, []);

  const updateDisplayRecipe = useCallback(() => {
    const tmp = recipes.filter(
      (recipe) => `#${recipe?.id}` === window.location.hash
    );
    if (tmp.length === 1) {
      setDisplayRecipe(tmp[0]);
    } else if (tmp.length === 0) {
      setDisplayRecipe(null);
    } else
      console.error(
        "updateDisplayRecipe-error: expected filtered array to contain 1 item but it contains more than 1..."
      );

    setChangedHash(false);
  }, [recipes, setDisplayRecipe, setChangedHash]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    if (changedHash) {
      updateDisplayRecipe();
    } else return;
  }, [updateDisplayRecipe, changedHash]);

  return (
    <div
      id="details"
      className={`flex flex-col h-full w-full relative transform transition-transform duration-700 ${
        !modalOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <RecipesList
        showManageView={isAdmin && mode === "edit"}
        setModalOpen={setModalOpen}
        setDisplayRecipe={setDisplayRecipe}
        recipes={recipes}
        loading={loadingList}
      />
      <RecipeDetails
        setOpen={setModalOpen}
        recipe={displayRecipe}
        setRecipe={setDisplayRecipe}
      />
    </div>
  );
};

export default Recipes;
