import React from "react";

import {
  Trash,
  Plus,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
} from "lucide-react";

const IngredientTab = ({
  ingredients,
  setIngredients,
  openTab,
  setOpenTab,
}) => {
  const updateValues = (newValue, index) => {
    setIngredients((prev) =>
      prev.map((oldValue, i) =>
        i === index ? { ...oldValue, ...newValue } : oldValue,
      ),
    );
  };

  const handleMove = (direction, index) => {
    if (
      (direction !== "up" && direction !== "down") ||
      (direction === "up" && index === 0) ||
      (direction === "down" && index === ingredients.length - 1)
    ) {
      return;
    }

    setIngredients((prev) => {
      const next = [...prev];
      const [item] = next.splice(index, 1);

      if (direction === "up") {
        next.splice(index - 1, 0, item);
      } else {
        next.splice(index + 1, 0, item);
      }

      return next;
    });
  };

  return (
    <div
      className={`absolute inset-x-0 top-full flex flex-col w-full h-full items-center justify-start bg-theme-3 p-6 transform transition-transform duration-300 ${
        openTab === "ingredients" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {openTab === null && (
        <div
          onClick={() => {
            if (openTab !== "ingredients") setOpenTab("ingredients");
            else setOpenTab(null);
          }}
          className="absolute bottom-full items-center space-x-2 cursor-pointer text-xl text-theme-1 left-0 shadow-lg flex py-4 w-1/2 bg-theme-3 rounded-t-xl justify-center"
        >
          <h2 className="flex">Ingredients</h2>
          {(ingredients.length > 1 ||
            (ingredients[0] && ingredients[0].name.length > 0)) && (
            <div className="flex items-center justify-center">
              <h2 className="flex relative size-10 z-10 items-center justify-center text-theme-3">
                <div className="absolute inset-0 w-full -z-10 h-full animate-spin-slow bg-theme-1 size-10 rounded-[15px] items-center justify-center" />
                {ingredients.length}
              </h2>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col max-w-[1000px] h-full rounded-[50px] bg-theme-1 inset-shadow-sm py-3 space-y-3">
        <h2 className="flex text-2xl justify-center py-3">Add Ingredients</h2>
        <div className="flex flex-col space-y-3 w-full h-[470px] min-h-12 overflow-y-auto px-1 pb-3">
          {ingredients.map((ingredient, index) => (
            <div key={`ingredient-${index}`} className="flex transition-all">
              <div className="flex flex-col min-w-9 rounded-l-[50px] bg-theme-2 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleMove("up", index)}
                  className="flex w-full h-1/2 px-2 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer"
                >
                  <ChevronsUp />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove("down", index)}
                  className="flex w-full h-1/2 px-2 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer"
                >
                  <ChevronsDown />
                </button>
              </div>
              <div className="flex flex-col space-x-4">
                <input
                  className="flex w-full transition-colors bg-theme-2 px-8 py-3"
                  placeholder="ingredient"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateValues({ name: e.target.value }, index)
                  }
                />
                <div className="flex w-full">
                  <input
                    className="flex w-full transition-colors bg-theme-2 px-8 py-3"
                    placeholder="qty"
                    value={ingredient.qty}
                    onChange={(e) =>
                      updateValues({ qty: e.target.value }, index)
                    }
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIngredients((prev) => {
                    if (prev.length === 1) return [{ name: "", qty: "" }];
                    return prev.filter((_, i) => i !== index);
                  });
                }}
                className="flex items-center justify-center rounded-r-[50px] px-3 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex mx-2 rounded-[50px] bg-theme-2 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-3"
          onClick={() =>
            setIngredients((prev) => [...prev, { name: "", qty: "" }])
          }
        >
          <Plus />
          <span>Add</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setIngredients((prev) => {
              const validIngredients = prev.filter(
                (ingredient) => ingredient?.name?.trim().length > 0,
              );
              return validIngredients.length > 0
                ? validIngredients
                : [{ name: "", qty: "" }];
            });
            setOpenTab(null);
          }}
          className="flex mx-2 text-2xl rounded-[50px] bg-theme-3 py-3 px-4 items-center justify-center space-x-2"
        >
          <ChevronDown size={"30px"} />
          <h2>Close</h2>
          <ChevronDown size={"30px"} />
        </button>
      </div>
    </div>
  );
};

export default IngredientTab;
