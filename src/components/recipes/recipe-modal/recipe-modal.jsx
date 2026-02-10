import { Check, LoaderCircle, X } from "lucide-react";
import IngredientTab from "./ingredient-tab";
import DirectionTab from "./direction-tab";
import { useRecipe } from "./useRecipe";
import UseCreateRecipeMutation from "../hooks/use-create-recipe-mutation";
import UseUpdateRecipeMutation from "../hooks/use-update-recipe-mutation";
import UseNotify from "../../notifications/UseNotify";
import ActivityTag from "../../activity-tag";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

const RecipeModal = ({
  show,
  setShow,
  editRecipe = null,
  onClose = () => null,
}) => {
  const { values, updateField, clearDraft } = useRecipe(editRecipe, show);

  const createRecipe = UseCreateRecipeMutation();
  const updateRecipe = UseUpdateRecipeMutation();

  const notify = UseNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editRecipe === null) {
        await createRecipe.mutateAsync({
          recipe: {
            active: values.active,
            title: values.title,
            description: values.description,
            prepTimeMins: values.prepTimeMins,
            notes: values.notes,
            ingredients: values.ingredients,
            steps: values.steps,
            source: values.source,
          },
        });
      } else {
        await updateRecipe.mutateAsync({
          recipeId: editRecipe.id,
          partialRecipe: {
            title: values.title,
            description: values.description,
            prepTimeMins: values.prepTimeMins,
            notes: values.notes,
            ingredients: values.ingredients,
            steps: values.steps,
            active: values.active,
            source: values.source,
          },
        });
      }
      notify("Recipe saved successfully!");
      handleClose();
    } catch (err) {
      console.error("Unexpected error while saving recipe:", err);
      notify(`Failed to save recipe: ${err.message}`);
    }
  };

  const handleClose = () => {
    clearDraft();
    onClose();
    setShow(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute inset-0 z-10 transition-transform transform duration-300 overflow-hidden ${
        show ? "translate-x-0" : "translate-x-full"
      } flex flex-col w-full items-center justify-start p-2 space-y-4 text-theme-4 bg-theme-2 h-full`}
    >
      <div className="flex flex-col max-w-[800px] w-full h-full overflow-y-scroll space-y-2">
        <div className="flex flex-row items-center space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center rounded-[50px] transition-colors bg-theme-4 hover:bg-theme-3 text-theme-1 py-3 px-6 cursor-pointer space-x-1"
          >
            <X />
            <h2 className="text-xl">Cancel</h2>
          </button>
          <h2 className="flex text-xl">
            {editRecipe === null ? "Create New Recipe" : "Edit Recipe"}
          </h2>
        </div>
        <div className="flex flex-col space-y-2 justify-center">
          <span className="flex flex-row">
            <input
              placeholder="title"
              value={values.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
              className="flex h-full w-full text-2xl md:text-4xl items-center rounded-lg shadow py-1 px-2 bg-black/10 outline-none"
            />
            <button
              type="button"
              className="flex cursor-pointer"
              onClick={() => updateField("active", !values.active)}
            >
              <ActivityTag active={values.active} className="mx-2" />
            </button>
          </span>
          <textarea
            placeholder="description"
            value={values.description}
            onChange={(e) => updateField("description", e.target.value)}
            required
            className="text-sm md:text-base p-1 rounded-lg shadow py-1 px-2 bg-black/10 outline-none"
          />
        </div>
        <TabGroup className={"flex flex-col pt-4 items-center h-full min-h-0"}>
          <TabList
            className={
              "flex bg-theme-4/10 inset-shadow-sm rounded-[50px] justify-between max-w-[700px] w-full"
            }
          >
            <Tab
              className={
                "flex items-center data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2 space-x-2"
              }
            >
              <span>Ingredients</span>
              {values.ingredients.filter((ing) => ing.name.length > 0).length >
              0 ? (
                <span className="flex items-center justify-center font-bold">
                  {
                    values.ingredients.filter((ing) => ing.name.length > 0)
                      .length
                  }
                </span>
              ) : null}
            </Tab>
            <Tab
              className={
                "flex items-center data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2 space-x-2"
              }
            >
              <span>Steps</span>
              {values.steps.filter((stp) => stp.length > 0).length > 0 ? (
                <span className="flex items-center justify-center font-bold">
                  {values.steps.filter((stp) => stp.length > 0).length}
                </span>
              ) : null}
            </Tab>
            <Tab
              className={
                "data-selected:bg-theme-4 data-selected:text-theme-1 outline-none rounded-[50px] px-3 py-2"
              }
            >
              Notes
            </Tab>
          </TabList>
          <TabPanels
            className={"flex flex-col grow w-full h-full min-h-0 py-2"}
          >
            <TabPanel
              id="ingredients-tab"
              className={"flex flex-col items-center min-h-0 overflow-y-auto"}
            >
              <IngredientTab
                ingredients={values.ingredients}
                setIngredients={(updater) => {
                  const next =
                    typeof updater === "function"
                      ? updater(values.ingredients)
                      : updater;
                  updateField("ingredients", next);
                }}
              />
            </TabPanel>
            <TabPanel
              id="steps-tab"
              className={"flex flex-col items-center min-h-0 overflow-y-auto"}
            >
              <DirectionTab
                steps={values.steps}
                setSteps={(updater) => {
                  const next =
                    typeof updater === "function"
                      ? updater(values.steps)
                      : updater;
                  updateField("steps", next);
                }}
              />
            </TabPanel>
            <TabPanel
              id="notes-tab"
              className={
                "flex flex-col items-center py-8 min-h-0 overflow-y-auto space-y-3"
              }
            >
              <div className="flex flex-col space-y-2 items-center w-full">
                <h2 className="text-xl">Recipe Source</h2>
                <input
                  placeholder="source title"
                  value={values.source?.title ?? ""}
                  onChange={(e) =>
                    updateField("source", {
                      ...values.source,
                      title: e.target.value,
                    })
                  }
                  required={values.source?.link ? true : false}
                  className="flex space-x-1 bg-black/10 outline-none focus:bg-black/20 px-6 py-3 rounded-lg w-full"
                />
                <input
                  placeholder="link to source"
                  value={values.source?.link ?? ""}
                  onChange={(e) =>
                    updateField("source", {
                      ...values.source,
                      link: e.target.value,
                    })
                  }
                  className="flex space-x-1 bg-black/10 outline-none focus:bg-black/20 px-6 py-3 rounded-lg w-full"
                />

                <input
                  className="flex rounded-lg w-full bg-black/10 outline-none focus:bg-black/20 px-6 py-3"
                  placeholder="source details"
                  value={values.source?.details ?? ""}
                  onChange={(e) =>
                    updateField("source", {
                      ...values.source,
                      details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col items-center space-y-2 w-full">
                <h2 className="text-xl">Notes</h2>
                <textarea
                  className="whitespace-pre-wrap w-full min-h-34 text-sm md:text-base bg-black/10 outline-none focus:bg-black/20 rounded-lg px-6 py-3"
                  placeholder="notes"
                  value={values.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                />
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <button
          type="submit"
          disabled={createRecipe.isPending || updateRecipe.isPending}
          className="flex items-center justify-center rounded-[50px] w-full space-x-1 text-xl transition-colors bg-theme-4 hover:bg-theme-3 text-theme-1 py-3 px-6 cursor-pointer"
        >
          {createRecipe.isPending || updateRecipe.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Check />
          )}
          <h2>Save</h2>
        </button>
      </div>
    </form>
  );
};

export default RecipeModal;
