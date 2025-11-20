import { MoveLeftIcon, X } from "lucide-react";
import PlaceHolderImage from "../place-holder-image";

const RecipeDetailsModal = ({ setOpen, recipe, setRecipe }) => {
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setRecipe(null);
    }, 700);
  };

  return (
    <div
      className={`absolute inset-0 transform translate-x-full z-10 flex flex-col h-full w-full text-lg font-bold bg-theme-2 p-8 inset-shadow-sm text-yellow-950 space-y-3`}
    >
      {recipe && (
        <>
          <div className="flex space-x-4">
            <div
              className={`flex relative size-[74px] items-center justify-center group cursor-pointer`}
              onClick={handleClose}
            >
              <div className="absolute inset-0 w-full h-full bg-yellow-950 shadow transition-all duration-500 rounded-[37px] group-hover:rounded-3xl group-hover:animate-spin-slow" />
              <div className="absolute flex items-center justify-center inset-0 w-full h-full">
                <MoveLeftIcon className="text-theme-2" size={"35"} />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-4xl">{recipe?.title}</h2>
              <h3>{recipe?.description}</h3>
            </div>
          </div>
          <div className="flex w-full h-1.5 bg-yellow-950 rounded-full" />
          <div className="flex flex-col overflow-y-auto h-full">
            <div className="flex flex-row items-start justify-evenly py-10">
              <PlaceHolderImage className="w-[400px]" />
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl">Ingredients</h2>
                <ul className="flex flex-col list-disc list-inside">
                  {recipe?.ingredients.length > 0 &&
                    recipe?.ingredients.map((ingredient, index) => (
                      <li key={`ingredient-${index}`} className="space-x-2">
                        <span>{ingredient.name}</span>
                        <span>-</span>
                        <span>{ingredient.qty}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl">Directions</h2>
                <ul className="flex flex-col list-decimal list-inside">
                  {recipe?.directions?.steps?.length > 0 &&
                    recipe?.directions?.steps?.map((step, index) => (
                      <li key={`ingredient-${index}`} className="space-x-2">
                        <span>{step}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="flex w-full h-1.5 bg-yellow-950 rounded-full" />
            <div className="flex flex-row items-start justify-evenly py-10">
              <div className="flex flex-col space-y-4">
                <h2 className="text-3xl">Notes</h2>
                <span>{recipe?.notes}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetailsModal;
