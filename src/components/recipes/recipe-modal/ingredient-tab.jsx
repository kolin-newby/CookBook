import React from "react";

import { Trash, Plus, ChevronsUp, ChevronsDown } from "lucide-react";

const IngredientTab = ({ ingredients, setIngredients }) => {
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
      className={`flex text-sm top-full flex-col w-full h-full items-center justify-start`}
    >
      <div className="flex flex-col max-w-[1000px] h-full py-3 space-y-2">
        <div className="flex flex-col space-y-3 w-full h-[470px] min-h-12 overflow-y-auto px-1 pb-3">
          {ingredients.map((ingredient, index) => (
            <div
              key={`ingredient-${index}`}
              className="flex transition-all shadow rounded-lg"
            >
              <div className="flex min-w-12 rounded-l-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleMove("up", index)}
                  className="flex w-1/2 h-full px-0.5 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer rounded-l-lg bg-black/10 outline-none"
                >
                  <ChevronsUp />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove("down", index)}
                  className="flex h-full w-1/2 px-0.5 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer bg-black/10 outline-none"
                >
                  <ChevronsDown />
                </button>
              </div>
              <div className="flex">
                <input
                  className="flex w-full max-w-[100px] transition-colors py-1 px-2 bg-black/10 focus:bg-black/20 outline-none"
                  placeholder="qty"
                  value={ingredient.qty}
                  onChange={(e) => updateValues({ qty: e.target.value }, index)}
                />
                <input
                  className="flex w-full transition-colors px-2 py-1.5 outline-none bg-black/10 focus:bg-black/20"
                  placeholder="ingredient"
                  value={ingredient.name}
                  onChange={(e) =>
                    updateValues({ name: e.target.value }, index)
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIngredients((prev) => {
                    if (prev.length === 1) return [{ name: "", qty: "" }];
                    return prev.filter((_, i) => i !== index);
                  });
                }}
                className="flex items-center justify-center rounded-r-lg px-1 cursor-pointer transition-colors bg-black/10 hover:bg-theme-3 hover:text-theme-1"
              >
                <Trash />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex mx-2 rounded-lg bg-black/10 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-1.5"
          onClick={() =>
            setIngredients((prev) => [...prev, { name: "", qty: "" }])
          }
        >
          <Plus />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default IngredientTab;
