import React, { useEffect, useState } from "react";
import PlaceHolderImage from "../place-holder-image";
import MutationBar from "./mutation-bar";
import RecipeModal from "../recipes/recipe-modal/recipe-modal";
import Loading from "../Loading";
import { NavLink } from "react-router";
import { X } from "lucide-react";
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
      {editRecipe && showModal && (
        <RecipeModal
          show={showModal}
          setShow={setShowModal}
          editRecipe={editRecipe}
        />
      )}
      <div
        className={`flex w-full max-w-[800px] ${
          showManageView ? "space-x-2" : "space-x-0"
        }`}
      >
        <div className={"flex bg-theme-3 rounded-[50px] p-2 w-full"}>
          <input
            className="flex rounded-[50px] text-lg py-2 px-6 w-full bg-theme-2"
            type="text"
            placeholder="search recipes..."
            value={search}
            onChange={(e) => setSearch(e?.target?.value.toLowerCase())}
          />
        </div>
        {showManageView && (
          <div className="flex w-full max-w-[600px]">
            <NavLink
              to={"/recipes"}
              className="flex w-full text-xl space-x-2 text-theme-1 rounded-[50px] bg-theme-3 py-3 items-center justify-center transform transition-all duration-200 hover:shadow-lg hover:scale-[102%]"
            >
              <X />
              <h2>Exit Edit Mode</h2>
            </NavLink>
          </div>
        )}
      </div>
      <ul className="flex flex-col space-y-4 w-full items-center p-4 text-yellow-950 overflow-y-scroll">
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
                    className="flex flex-row w-full rounded-[50px] inset-shadow-sm items-center justify-center transition-all duration-300 cursor-pointer bg-theme-4/10 hover:scale-[103%] hover:bg-transparent hover:inset-shadow-none hover:shadow"
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
