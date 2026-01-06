import { Check, LoaderCircle, X } from "lucide-react";
import { useState } from "react";
import IngredientTab from "./ingredient-tab";
import DirectionTab from "./direction-tab";
import { useRecipe } from "./useRecipe";
import UseCreateRecipeMutation from "../hooks/use-create-recipe-mutation";
import UseUpdateRecipeMutation from "../hooks/use-update-recipe-mutation";
import UseNotify from "../../notifications/UseNotify";

const RecipeModal = ({ show, setShow, editRecipe = null }) => {
  const [openTab, setOpenTab] = useState(null);

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
    setShow(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`absolute inset-0 z-10 transition-transform transform duration-300 overflow-hidden ${
        show ? "translate-x-0" : "translate-x-full"
      } flex flex-col w-full items-center justify-start p-6 space-y-4 text-theme-4 bg-theme-1`}
    >
      <div className="flex flex-col max-w-[800px] w-full space-y-4">
        <div className="flex flex-row items-center space-x-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center rounded-[50px] transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer space-x-1"
          >
            <X />
            <h2 className="text-xl">Cancel</h2>
          </button>
          <h2 className="flex text-xl">
            {editRecipe === null ? "Create New Recipe" : "Edit Recipe"}
          </h2>
        </div>
        <div className="flex">
          <input
            className="flex rounded-[50px] w-full transition-colors bg-theme-2 px-8 py-3"
            placeholder="title"
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>
        <div className="flex w-full items-center justify-center space-x-1">
          <input
            className="w-full rounded-[50px] transition-colors bg-theme-2 px-8 py-3"
            type="number"
            min={0}
            placeholder="0"
            value={values.prepTimeMins}
            onChange={(e) => updateField("prepTimeMins", e.target.value)}
            id="prepTimeMins"
            required
          />
          <span className="flex text-xl">min(s)</span>
        </div>
        <textarea
          className="flex rounded-[50px] transition-colors bg-theme-2 px-8 py-3"
          placeholder="description"
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
        />
        <textarea
          className="flex flex-col rounded-[48px] max-h-36 h-fit grow transition-colors bg-theme-2 px-8 py-3"
          placeholder="notes"
          value={values.notes}
          onChange={(e) => updateField("notes", e.target.value)}
        />
        <button
          type="button"
          className="flex items-center justify-center rounded-[50px] w-full space-x-1 text-xl transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer"
          onClick={() => updateField("active", !values.active)}
        >
          {values.active ? "ACTIVE" : "INACTIVE"}
        </button>
        <button
          type="submit"
          disabled={createRecipe.isPending || updateRecipe.isPending}
          className="flex items-center justify-center rounded-[50px] w-full space-x-1 text-xl transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer"
        >
          {createRecipe.isPending || updateRecipe.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Check />
          )}
          <h2>Submit</h2>
        </button>
      </div>
      <IngredientTab
        openTab={openTab}
        setOpenTab={setOpenTab}
        ingredients={values.ingredients}
        setIngredients={(updater) => {
          const next =
            typeof updater === "function"
              ? updater(values.ingredients)
              : updater;
          updateField("ingredients", next);
        }}
      />
      <DirectionTab
        openTab={openTab}
        setOpenTab={setOpenTab}
        steps={values.steps}
        setSteps={(updater) => {
          const next =
            typeof updater === "function" ? updater(values.steps) : updater;
          updateField("steps", next);
        }}
      />
    </form>
  );
};

export default RecipeModal;
