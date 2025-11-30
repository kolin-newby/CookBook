import { Check, LoaderCircle, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AddRecipe, UpdateRecipe } from "../../hooks";
import IngredientTab from "./ingredient-tab";
import DirectionTab from "./direction-tab";

const RecipeModal = ({ show, setShow, editRecipe = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [steps, setSteps] = useState([""]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [openTab, setOpenTab] = useState(null);

  const [prepTimeMins, setPrepTimeMins] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      if (editRecipe === null) {
        const response = await AddRecipe({
          title,
          description,
          prepTime: prepTimeMins,
          notes: note,
          ingredients,
          directions: { steps },
        });

        if (response.status === 201) {
          handleClose();
          return;
        }

        setSubmitError(`Failed to create recipe (status ${response.status}).`);
        console.error("AddRecipe failed:", response);
      } else {
        const response = await UpdateRecipe(editRecipe.id, {
          title,
          description,
          prep_time_mins: prepTimeMins,
          notes: note,
          ingredients,
          directions: { steps },
        });

        if (response.status === 200) {
          handleClose();
          return;
        }

        setSubmitError(`Failed to update recipe (status ${response.status}).`);
        console.error("UpdateRecipe failed:", response);
      }
    } catch (err) {
      console.error("Unexpected error while saving recipe:", err);
      setSubmitError("Something went wrong while saving this recipe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleTimeInput = (e) => {
    const input = Number(e.target.value);

    if (Number.isNaN(input) || input < 0) {
      setPrepTimeMins(0);
    } else {
      setPrepTimeMins(input);
    }
  };

  const setInitialValues = useCallback(() => {
    setTitle(editRecipe.title);
    setDescription(editRecipe.description);
    setNote(editRecipe.notes);
    setPrepTimeMins(editRecipe.prep_time_mins);
    setSteps(editRecipe.directions.steps);
    setIngredients(editRecipe.ingredients);
  }, [editRecipe]);

  useEffect(() => {
    if (editRecipe !== null) {
      setInitialValues();
    }
  }, [editRecipe, setInitialValues]);

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full items-center justify-center space-x-1">
          <input
            className="w-full rounded-[50px] transition-colors bg-theme-2 px-8 py-3"
            type="number"
            min={0}
            placeholder="0"
            value={prepTimeMins}
            onChange={handleTimeInput}
            id="prep_time_mins"
            required
          />
          <span className="flex text-xl">min(s)</span>
        </div>
        <textarea
          className="flex rounded-[50px] transition-colors bg-theme-2 px-8 py-3"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <textarea
          className="flex flex-col rounded-[48px] max-h-36 h-fit grow transition-colors bg-theme-2 px-8 py-3"
          placeholder="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-[50px] w-full space-x-1 text-xl transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer"
        >
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : <Check />}
          <h2>Submit</h2>
        </button>
        {submitError && <span className="flex">{submitError}</span>}
      </div>
      <IngredientTab
        openTab={openTab}
        setOpenTab={setOpenTab}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <DirectionTab
        openTab={openTab}
        setOpenTab={setOpenTab}
        steps={steps}
        setSteps={setSteps}
      />
    </form>
  );
};

export default RecipeModal;
