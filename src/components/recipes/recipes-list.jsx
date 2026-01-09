import React, { useEffect, useState } from "react";
import PlaceHolderImage from "../place-holder-image";
import MutationBar from "./mutation-bar";
import RecipeModal from "../recipes/recipe-modal/recipe-modal";
import Loading from "../Loading";
import { NavLink } from "react-router";
import { Plus, X } from "lucide-react";
import InactiveTag from "../activity-tag";

const RecipesList = ({
  setModalOpen,
  setDisplayRecipe,
  activeRecipes,
  inactiveRecipes,
  loading,
  showManageView,
}) => {
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    let active = [];
    let inactive = [];

    if (activeRecipes !== null) {
      active = activeRecipes
        .sort()
        .filter(
          (recipe) =>
            recipe?.title?.toLowerCase().includes(search) ||
            search.includes(recipe?.title?.toLowerCase())
        );
      if (inactiveRecipes !== null && showManageView) {
        inactive = inactiveRecipes
          .sort()
          .filter(
            (recipe) =>
              recipe?.title?.toLowerCase().includes(search) ||
              search.includes(recipe?.title?.toLowerCase())
          );
      }
    }

    setFilteredRecipes([...active, ...inactive]);
  }, [activeRecipes, inactiveRecipes, showManageView, search]);

  return (
    <div
      className={`inset-0 flex flex-col space-y-4 absolute w-full h-full overflow-hidden items-center justify-start p-8`}
    >
      {showModal && (
        <RecipeModal
          show={showModal}
          setShow={setShowModal}
          editRecipe={editRecipe}
        />
      )}
      <div
        className={`flex w-full max-w-[800px] ${
          showManageView
            ? "space-x-2 flex-col sm:flex-row items-center space-y-2 sm:space-y-0"
            : "space-x-0"
        }`}
      >
        <div
          className={`flex bg-theme-3 rounded-[50px] p-2 w-full ${
            showManageView ? "sm:w-2/3" : ""
          }`}
        >
          <input
            className="flex rounded-[50px] text-lg py-2 px-6 w-full bg-theme-2"
            type="text"
            placeholder="search recipes..."
            value={search}
            onChange={(e) => setSearch(e?.target?.value.toLowerCase())}
          />
        </div>
        {showManageView && (
          <div className="flex w-full sm:w-1/3 space-x-2 text-lg">
            <button
              className="flex w-full px-3 space-x-2 cursor-pointer flex-nowrap text-nowrap text-theme-1 rounded-[50px] bg-theme-3 py-3 items-center justify-center shadow transform transition-all duration-100 hover:shadow-lg hover:-translate-y-0.5"
              onClick={() => setShowModal(true)}
            >
              <Plus />
              <h2>Add</h2>
            </button>
            <NavLink
              to={"/recipes"}
              className="flex w-full px-3 space-x-2 flex-nowrap text-nowrap text-theme-1 rounded-[50px] bg-theme-3 py-3 items-center justify-center shadow transform transition-all duration-100 hover:shadow-lg hover:-translate-y-0.5"
            >
              <X />
              <h2>Done</h2>
            </NavLink>
          </div>
        )}
      </div>
      <ul className="flex flex-col space-y-4 w-full items-center text-yellow-950 overflow-y-scroll py-2">
        {loading ? (
          <Loading />
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map(
            (recipe, index) =>
              search !== "<empty string>" && (
                <li
                  key={`recipe-item-${index}-${recipe.title}`}
                  className="flex flex-col w-full max-w-[800px]"
                >
                  <div
                    className="flex flex-row w-full rounded-[50px] shadow items-center justify-center transition-all duration-100 cursor-pointer bg-theme-4/10 hover:-translate-y-1 hover:bg-transparent hover:shadow-lg"
                    onClick={() => {
                      setDisplayRecipe(recipe);
                      setModalOpen(true);
                    }}
                  >
                    <div className="flex flex-col relative overflow-hidden w-full rounded-[50px] items-center justify-center">
                      <div className="flex relative w-full px-4 py-4 items-center justify-center bg-theme-4/40">
                        <PlaceHolderImage className="-z-10" />
                        <span className="flex text-theme-1 items-center justify-center text-2xl md:text-3xl space-x-2">
                          <h2 className="">{recipe?.title}</h2>
                          {showManageView ? (
                            <InactiveTag active={recipe?.active} />
                          ) : null}
                        </span>
                      </div>
                      <h3 className="flex text-xs md:text-base pb-6 pt-2 px-4">
                        {recipe?.description}
                      </h3>
                    </div>
                  </div>
                  {showManageView && (
                    <MutationBar
                      recipe={recipe}
                      setRecipe={setEditRecipe}
                      setShowModal={setShowModal}
                    />
                  )}
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
