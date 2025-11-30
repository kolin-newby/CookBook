import { Trash, Plus, ChevronDown } from "lucide-react";

const DirectionTab = ({ openTab, setOpenTab, steps, setSteps }) => {
  const updateItemName = (newValue, index) =>
    setSteps((prev) =>
      prev.map((oldValue, i) => (i === index ? newValue : oldValue))
    );

  return (
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

      <div className="flex flex-col rounded-[50px] bg-theme-1 max-w-[1000px] h-full inset-shadow-sm px-4 py-3 space-y-3">
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
                  type="button"
                  onClick={() => {
                    setSteps((prev) => {
                      if (prev.length === 1) return [""];
                      return prev.filter((_, i) => i !== index);
                    });
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
          type="button"
          className="flex rounded-[50px] transition-colors bg-theme-2 hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-3"
          onClick={() => setSteps((prev) => [...prev, ""])}
        >
          <Plus />
          <span>direction</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setSteps((prev) => {
              const validSteps = prev.filter((step) => step.trim().length > 0);
              return validSteps.length > 0 ? validSteps : [""];
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

export default DirectionTab;
