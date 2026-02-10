import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import RecipeDetails from "../components/recipes/recipe-details";
import UseActiveRecipes from "../components/recipes/hooks/use-active-recipes";
import RecipesList from "../components/recipes/recipes-list";
import { useAuth } from "../components/auth/AuthContext";
import UseInactiveRecipes from "../components/recipes/hooks/use-inactive-recipes";

const Recipes = () => {
  const [displayRecipe, setDisplayRecipe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { isAdmin } = useAuth();
  const { mode } = useParams();
  const showManageView = isAdmin && mode === "edit";

  const activeQuery = UseActiveRecipes();
  const inactiveQuery = UseInactiveRecipes({ queryEnabled: showManageView });

  const activeRecipes = useMemo(
    () => activeQuery.data ?? [],
    [activeQuery.data],
  );
  const inactiveRecipes = showManageView ? (inactiveQuery.data ?? []) : null;

  const updateDisplayRecipe = useCallback(() => {
    const match = activeRecipes.find(
      (recipe) => `#${recipe?.id}` === window.location.hash,
    );
    setDisplayRecipe(match ?? null);
  }, [activeRecipes]);

  useEffect(() => {
    updateDisplayRecipe();
  }, [updateDisplayRecipe]);

  useEffect(() => {
    const onHashChange = () => updateDisplayRecipe();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [updateDisplayRecipe]);

  return (
    <div
      id="details"
      className={`flex flex-col h-full w-full relative transform transition-transform duration-500 ${
        !modalOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <RecipesList
        showManageView={showManageView}
        setModalOpen={setModalOpen}
        setDisplayRecipe={setDisplayRecipe}
        activeRecipes={activeRecipes}
        inactiveRecipes={inactiveRecipes}
        loading={
          activeQuery.isLoading ||
          activeQuery.isFetching ||
          (showManageView &&
            (inactiveQuery.isLoading || inactiveQuery.isFetching))
        }
      />
      <RecipeDetails
        setOpen={setModalOpen}
        recipe={displayRecipe}
        setRecipe={setDisplayRecipe}
        showManageView={showManageView}
      />
    </div>
  );
};

export default Recipes;
