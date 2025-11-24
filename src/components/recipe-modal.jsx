import { ArrowBigDown, Check, ChevronDown, Plus, Trash, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { AddRecipe, UpdateRecipe } from "./hooks";

const IngredientInput = ({ ingredients, setIngredients, setOpenTab }) => {
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
    <div className="flex flex-col max-w-[1000px] rounded-[50px] bg-theme-1 inset-shadow-sm py-6 px-8 space-y-3">
      <h2 className="flex text-2xl justify-center py-3">Add Ingredients</h2>
      <div className="flex flex-col space-y-3 w-full  h-[470px] min-h-12 overflow-y-auto p-1 pb-3">
        {ingredients.map((ingredient, index) => (
          <div key={`ingredient-${index}`} className="flex flex-col space-x-4">
            <input
              className="flex rounded-t-[50px] w-full transition-colors bg-theme-2 px-8 py-3"
              placeholder="ingedient"
              value={ingredient.name}
              onChange={(e) => updateItemName(e.target.value, index)}
              required
            />
            <div className="flex w-full">
              <input
                className="flex rounded-bl-[50px] w-full transition-colors bg-theme-2 px-8 py-3"
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
                className="flex items-center justify-center rounded-br-[50px] pt-3 pl-3 pr-5 pb-5 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
              >
                <Trash />
              </button>
            </div>
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
      <button
        onClick={() => {
          const validIngredients = ingredients.filter(
            (ingredient) => ingredient.name.length > 0
          );
          setIngredients(
            validIngredients.length > 0
              ? validIngredients
              : [{ name: "", qty: "" }]
          );
          setOpenTab(null);
        }}
        className="flex text-2xl rounded-full bg-theme-3 py-3 px-4 items-center justify-center space-x-2"
      >
        <ChevronDown size={"30px"} />
        <h2>Close</h2>
        <ChevronDown size={"30px"} />
      </button>
    </div>
  );
};

const DirectionsInput = ({ steps, setSteps, setOpenTab }) => {
  const updateItemName = (val, index) => {
    const tmpArray = steps.map((item, i) => (i === index ? val : item));

    setSteps(tmpArray);
  };

  return (
    <div className="flex flex-col rounded-[50px] bg-theme-1 max-w-[1000px] inset-shadow-sm px-4 py-3 space-y-3">
      <h2 className="flex text-2xl justify-center">Add Directions</h2>
      <ol className="flex flex-col space-y-3 w-full h-[470px] min-h-12 overflow-y-auto p-1 pb-3">
        {steps.map((step, index) => (
          <li key={`ingredient-${index}`} className="flex flex-row space-x-1">
            <span className="flex items-center justify-center">
              {index + 1}.
            </span>
            <div className="flex flex-col space-y-0.5">
              <textarea
                className="flex rounded-t-[50px] h-[100px] w-full bg-theme-2 transition-colors px-8 py-3"
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
                className="flex items-center justify-center rounded-b-full py-2 px-4 cursor-pointer transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1"
              >
                <Trash />
              </button>
            </div>
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
      <button
        onClick={() => {
          const validSteps = steps.filter((step) => step.length > 0);
          setSteps(validSteps.length > 0 ? validSteps : [""]);
          setOpenTab(null);
        }}
        className="flex text-2xl rounded-full bg-theme-3 py-3 px-4 items-center justify-center space-x-2"
      >
        <ChevronDown size={"30px"} />
        <h2>Close</h2>
        <ChevronDown size={"30px"} />
      </button>
    </div>
  );
};

const RecipeModal = ({ show, setShow, editRecipe = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", qty: "" }]);
  const [steps, setSteps] = useState([""]);

  const [openTab, setOpenTab] = useState(null);

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
    <form
      onSubmit={handleSubmit}
      className={`absolute inset-0 z-10 transition-transform transform duration-300 overflow-hidden ${
        show ? "translate-x-0" : "translate-x-full"
      } flex flex-col w-full items-center justify-center p-6 space-y-4 text-theme-4 bg-theme-1`}
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
            required
          />
        </div>
        <div className="flex w-full items-center justify-center space-x-1">
          <input
            className="w-full rounded-full transition-colors bg-theme-2 px-8 py-3"
            type="number"
            min={0}
            placeholder="0"
            value={prepTimeMin}
            onChange={handleTimeInput}
            id="prep_time_mins"
            required
          />
          <span className="flex text-xl">min(s)</span>
        </div>
        <textarea
          className="flex rounded-full transition-colors bg-theme-2 px-8 py-3"
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
          required
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-full w-full space-x-1 text-xl transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 py-3 px-6 cursor-pointer"
        >
          <Check />
          <h2>Submit</h2>
        </button>
      </div>

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
              (ingredients[0].name && ingredients[0].name.length > 0)) && (
              <div className="flex items-center justify-center">
                <h2 className="flex relative size-[40px] z-10 items-center justify-center text-theme-3">
                  <div className="absolute inset-0 w-full -z-10 h-full animate-spin-slow bg-theme-1 size-[40px] rounded-[15px] items-center justify-center" />
                  {ingredients.length}
                </h2>
              </div>
            )}
          </div>
        )}
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          setOpenTab={setOpenTab}
        />
      </div>
      <div
        className={`absolute inset-x-0 top-full h-full items-center justify-start flex flex-col w-full bg-theme-3 p-6 transition-transform duration-300 transform ${
          openTab === "directions" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        {openTab === null && (
          <div
            onClick={() => {
              if (openTab !== "directions") setOpenTab("directions");
              else setOpenTab(null);
            }}
            className="absolute bottom-full items-center space-x-2 cursor-pointer text-xl text-theme-1 right-0 shadow-lg flex py-4 w-1/2 bg-theme-3 rounded-t-xl justify-center"
          >
            <h2 className="flex">Directions</h2>
            {(steps.length > 1 || (steps[0] && steps[0].length > 0)) && (
              <div className="flex items-center justify-center">
                <h2 className="flex relative size-[40px] z-10 items-center justify-center text-theme-3">
                  <div className="absolute inset-0 w-full -z-10 h-full animate-spin-slow bg-theme-1 size-[40px] rounded-[15px] items-center justify-center" />
                  {steps.length}
                </h2>
              </div>
            )}
          </div>
        )}
        <DirectionsInput
          steps={steps}
          setSteps={setSteps}
          setOpenTab={setOpenTab}
        />
      </div>
    </form>
  );
};

export default RecipeModal;
