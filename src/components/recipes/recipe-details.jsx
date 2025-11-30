import { MoveLeftIcon, X } from "lucide-react";
import PlaceHolderImage from "../place-holder-image";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const RecipeDetails = ({ setOpen, recipe, setRecipe }) => {
  // const [activeSection, setActiveSection] = useState(null);

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
          <div className="flex w-full space-x-4">
            <div
              className={`relative aspect-square h-[74px] items-center justify-center group cursor-pointer`}
              onClick={handleClose}
            >
              <div className="absolute inset-0 w-full h-full bg-theme-4 shadow transition-all duration-500 rounded-[37px] group-hover:rounded-3xl group-hover:animate-spin-slow" />
              <div className="absolute flex items-center justify-center inset-0 w-full h-full">
                <MoveLeftIcon className="text-theme-2" size={"35"} />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl md:text-4xl">{recipe?.title}</h2>
              <h3 className="text-sm md:text-base">{recipe?.description}</h3>
            </div>
          </div>
          <TabGroup className={"flex flex-col pt-4 items-center"}>
            <TabList
              className={
                "flex bg-theme-4/10 inset-shadow-sm rounded-[50px] justify-between max-w-[700px] w-full"
              }
            >
              <Tab
                className={
                  "data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2"
                }
              >
                Ingredients
              </Tab>
              <Tab
                className={
                  "data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2"
                }
              >
                Directions
              </Tab>
              <Tab
                className={
                  "data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2"
                }
              >
                Notes
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                id="ingredients-tab"
                className={"flex flex-col items-center py-8"}
              >
                <ul className="flex flex-col list-disc list-inside">
                  {recipe?.ingredients.length > 0 &&
                    recipe?.ingredients.map((ingredient, index) => (
                      <li key={`ingredient-${index}`} className="space-x-1.5">
                        <span>{ingredient.qty}</span>
                        <span>{ingredient.name}</span>
                      </li>
                    ))}
                </ul>
              </TabPanel>
              <TabPanel
                id="directions-tab"
                className={"flex flex-col items-center py-8"}
              >
                <ul className="flex flex-col list-decimal list-inside">
                  {recipe?.directions?.steps?.length > 0 &&
                    recipe?.directions?.steps?.map((step, index) => (
                      <li key={`ingredient-${index}`} className="space-x-2">
                        <span>{step}</span>
                      </li>
                    ))}
                </ul>
              </TabPanel>
              <TabPanel
                id="notes-tab"
                className={"flex flex-col items-center py-8"}
              >
                <span>{recipe?.notes}</span>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
