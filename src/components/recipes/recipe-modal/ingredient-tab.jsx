import { Trash, Plus, ChevronDown } from "lucide-react";

const IngredientTab = ({
  ingredients,
  setIngredients,
  openTab,
  setOpenTab,
}) => {
  const updateValues = (newValue, index) => {
    setIngredients((prev) =>
      prev.map((oldValue, i) =>
        i === index ? { ...oldValue, ...newValue } : oldValue
      )
    );
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
          className="absolute bottom-full items-centerx space-x-2 cursor-pointer text-xl text-theme-1 left-0 shadow-lg flex py-4 w-1/2 bg-theme-3 rounded-t-xl justify-center"
        >
          <h2 className="flex">Ingredients</h2>
          {(ingredients.length > 1 ||
            (ingredients[0] && ingredients[0].name.length > 0)) && (
            <div className="flex items-center justify-center">
              <h2 className="flex relative size-[40px] z-10 items-center justify-center text-theme-3">
                <div className="absolute inset-0 w-full -z-10 h-full animate-spin-slow bg-theme-1 size-[40px] rounded-[15px] items-center justify-center" />
                {ingredients.length}
              </h2>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col max-w-[1000px] h-full rounded-[50px] bg-theme-1 inset-shadow-sm py-6 px-8 space-y-3">
        <h2 className="flex text-2xl justify-center py-3">Add Ingredients</h2>
        <div className="flex flex-col space-y-3 w-full  h-[470px] min-h-12 overflow-y-auto p-1 pb-3">
          {ingredients.map((ingredient, index) => (
            <div
              key={`ingredient-${index}`}
              className="flex flex-col space-x-4"
            >
              <input
                className="flex rounded-t-[50px] w-full transition-colors bg-theme-2 px-8 py-3"
                placeholder="ingedient"
                value={ingredient.name}
                onChange={(e) => updateValues({ name: e.target.value }, index)}
              />
              <div className="flex w-full">
                <input
                  className="flex rounded-bl-[50px] w-full transition-colors bg-theme-2 px-8 py-3"
                  placeholder="qty"
                  value={ingredient.qty}
                  onChange={(e) => updateValues({ qty: e.target.value }, index)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setIngredients((prev) => {
                      if (prev.length === 1) return [{ name: "", qty: "" }];
                      return prev.filter((_, i) => i !== index);
                    });
                  }}
                  className="flex items-center justify-center rounded-br-[50px] pt-3 pl-3 pr-5 pb-5 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex rounded-[50px] bg-theme-2 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-3"
          onClick={() =>
            setIngredients((prev) => [...prev, { name: "", qty: "" }])
          }
        >
          <Plus />
          <span>ingredient</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setIngredients((prev) => {
              const validIngredients = prev.filter(
                (ingredient) => ingredient?.name?.trim().length > 0
              );
              return validIngredients.length > 0
                ? validIngredients
                : [{ name: "", qty: "" }];
            });
            setOpenTab(null);
          }}
          className="flex text-2xl rounded-[50px] bg-theme-3 py-3 px-4 items-center justify-center space-x-2"
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
