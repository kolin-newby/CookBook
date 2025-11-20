import { Check, Plus, Trash, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AddRecipe, UpdateRecipe } from "./hooks";

const IngredientInput = ({ ingredients, setIngredients }) => {
  const updateItemName = (val, index) => {
    const tmpArray = ingredients.map((item, i) =>
      i === index
        ? {
            ...item,
            name: val,
          }
        : item
    );

    setIngredients(tmpArray);
  };

  const updateItemQty = (val, index) => {
    const tmpArray = ingredients.map((item, i) =>
      i === index
        ? {
            ...item,
            qty: val,
          }
        : item
    );

    setIngredients(tmpArray);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 w-full max-h-96 min-h-12 overflow-y-auto p-1">
        {ingredients.map((ingredient, index) => (
          <div
            key={`ingredient-${index}`}
            className="flex flex-row space-x-4 pr-6"
          >
            <input
              className="flex rounded-full w-5/6 transition-colors bg-theme-2 px-8 py-3"
              placeholder="ingedient"
              value={ingredient.name}
              onChange={(e) => updateItemName(e.target.value, index)}
            />
            <input
              className="flex rounded-full w-1/5 transition-colors bg-theme-2 px-8 py-3"
              placeholder="qty"
              value={ingredient.qty}
              onChange={(e) => updateItemQty(e.target.value, index)}
            />
            <button
              onClick={() => {
                const tmpArray = ingredients.filter((_, i) => i !== index);
                if (ingredients.length === 1)
                  setIngredients([{ name: "", qty: "" }]);
                else setIngredients(tmpArray);
              }}
              className="flex items-center justify-center rounded-full py-3 px-4 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
            >
              <Trash />
            </button>
          </div>
        ))}
      </div>
      <button
        className="flex rounded-full bg-theme-2 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-3"
        onClick={() =>
          setIngredients([
            ...ingredients,
            {
              name: "",
              qty: "",
            },
          ])
        }
      >
        <Plus />
        <span>ingredient</span>
      </button>
    </>
  );
};

const DirectionsInput = ({ steps, setSteps }) => {
  const updateItemName = (val, index) => {
    const tmpArray = steps.map((item, i) => (i === index ? val : item));

    setSteps(tmpArray);
  };

  return (
    <>
      <ol className="flex flex-col space-y-4 w-full max-h-96 min-h-12 overflow-y-auto p-1">
        {steps.map((step, index) => (
          <li
            key={`ingredient-${index}`}
            className="flex flex-row space-x-4 pr-6"
          >
            <span className="flex items-center justify-center">
              {index + 1}.
            </span>
            <input
              className="flex rounded-full w-full bg-theme-2 transition-colors px-8 py-3"
              placeholder="direction"
              value={step}
              onChange={(e) => updateItemName(e.target.value, index)}
            />
            <button
              onClick={() => {
                const tmpArray = steps.filter((_, i) => i !== index);
                if (steps.length === 1) setSteps([""]);
                else setSteps(tmpArray);
              }}
              className="flex items-center justify-center rounded-full py-3 px-4 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
            >
              <Trash />
            </button>
          </li>
        ))}
      </ol>
      <button
        className="flex rounded-full transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-3"
        onClick={() => setSteps([...steps, ""])}
      >
        <Plus />
        <span>direction</span>
      </button>
    </>
  );
};

const RecipeModal = ({ show, setShow, editRecipe = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [steps, setSteps] = useState([""]);

  const [unifiedPrepTime, setUnifiedPrepTime] = useState(0);
  const [prepTimeMin, setPrepTimeMin] = useState(0);

  const handleSubmit = () => {
    if (editRecipe === null) {
      AddRecipe({
        title: title,
        description: description,
        prepTime: unifiedPrepTime,
        notes: note,
        ingredients: ingredients,
        directions: { steps: steps },
      }).then((response) => {
        if (response.status === 201) {
          handleClose();
        }
      });
    } else {
      UpdateRecipe(editRecipe.id, {
        title: title,
        description: description,
        prep_time_mins: unifiedPrepTime,
        notes: note,
        ingredients: ingredients,
        directions: { steps: steps },
      }).then((response) => {
        if (response.status === 200) {
          console.log(response);
          handleClose();
        }
      });
    }
  };

  const handleClose = () => {
    setShow(!show);
  };

  const handleTimeInput = (e) => {
    const input = Number(e.target.value);

    setUnifiedPrepTime(input);
    setPrepTimeMin(input);
  };

  const setInitialValues = useCallback(() => {
    setTitle(editRecipe.title);
    setDescription(editRecipe.description);
    setNote(editRecipe.notes);
    setPrepTimeMin(editRecipe.prep_time_mins);
    setUnifiedPrepTime(editRecipe.prep_time_mins);
    setSteps(editRecipe.directions.steps);
    setIngredients(editRecipe.ingredients);
  }, [editRecipe]);

  useEffect(() => {
    if (editRecipe !== null) {
      setInitialValues();
    }
  }, [editRecipe, setInitialValues]);

  return (
    <div
      className={`absolute inset-0 z-10 transition-transform transform duration-500 ${
        show ? "translae-x-0" : "translate-x-full"
      } flex flex-col w-full items-center justify-center px-6 py-4 space-y-4 text-theme-4 bg-theme-1`}
    >
      <div className="flex flex-col max-w-[800px] w-full space-y-4">
        <div className="flex flex-row items-center space-x-4">
          <button
            onClick={handleClose}
            className="flex items-center justify-center rounded-full transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer space-x-1"
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
            className="flex rounded-full w-full transition-colors bg-theme-2 px-8 py-3"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center space-x-1">
          <input
            className="flex rounded-full transition-colors bg-theme-2 px-8 py-3"
            type="number"
            min={0}
            placeholder="0"
            value={prepTimeMin}
            onChange={handleTimeInput}
            id="prep_time_mins"
          />
          <span className="flex text-xl">min(s)</span>
        </div>
        <input
          className="flex rounded-full transition-colors bg-theme-2 px-8 py-3"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          className="flex rounded-[48px] h-36 transition-colors bg-theme-2 px-8 py-3"
          placeholder="notes"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <IngredientInput
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <DirectionsInput steps={steps} setSteps={setSteps} />
      <div className="flex flex-row justify-end">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center rounded-full w-full space-x-1 text-xl transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer"
        >
          <Check />
          <h2>Submit</h2>
        </button>
      </div>
    </div>
  );
};

export default RecipeModal;
