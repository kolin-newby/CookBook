import { Trash, Plus, ChevronsUp, ChevronsDown } from "lucide-react";

const DirectionTab = ({ steps, setSteps }) => {
  const updateItemName = (newValue, index) =>
    setSteps((prev) =>
      prev.map((oldValue, i) => (i === index ? newValue : oldValue)),
    );

  const handleMove = (direction, index) => {
    if (
      (direction !== "up" && direction !== "down") ||
      (direction === "up" && index === 0) ||
      (direction === "down" && index === steps.length - 1)
    )
      return;

    setSteps((prev) => {
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
      <div className="flex flex-col max-w-[1000px] h-full py-1.5 space-y-1.5">
        <ol className="flex flex-col space-y-1.5 w-full h-[470px] min-h-10 overflow-y-auto p-1 pb-1.5">
          {steps.map((step, index) => (
            <li key={`ingredient-${index}`} className="flex pl-0.5">
              <span className="flex items-center justify-center pr-1.5">
                {index + 1}.
              </span>
              <div className="flex flex-col min-w-9 rounded-l-lg bg-black/10 outline-none overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleMove("up", index)}
                  className="w-full h-1/2 pr-2 pl-2 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer"
                >
                  <ChevronsUp />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove("down", index)}
                  className="w-full h-1/2 pr-2 pl-2 items-center justify-center hover:bg-theme-3 hover:text-theme-1 transition-colors cursor-pointer"
                >
                  <ChevronsDown />
                </button>
              </div>
              <textarea
                className="flex min-h-20 w-full bg-black/10 outline-none focus:bg-black/20 px-8 py-3"
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
                className="flex items-center justify-center rounded-r-lg px-3 cursor-pointer transition-colors bg-black/10 outline-none hover:bg-theme-3 hover:text-theme-1"
              >
                <Trash />
              </button>
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="flex mx-2 rounded-lg transition-colors bg-black/10 outline-none hover:bg-theme-3 hover:text-theme-1 cursor-pointer items-center justify-center py-1.5"
          onClick={() => setSteps((prev) => [...prev, ""])}
        >
          <Plus />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

export default DirectionTab;
