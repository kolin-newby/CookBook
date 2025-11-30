import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import { DeleteRecipe } from "../hooks";

const MutationBar = ({ recipe, setRecipe, setShowModal }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    DeleteRecipe(recipe.id).then((data) => {
      //TODO handle errors
    });
  };

  const handleEdit = () => {
    setRecipe(recipe);
    setShowModal(true);
  };

  return (
    <div className="flex flex-row items-center justify-center pt-2">
      <button
        onClick={handleEdit}
        className="flex flex-row items-center space-x-1 text-xl bg-theme-3 rounded-l-full px-10 py-2 text-theme-1 cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[103%]"
      >
        <Edit className="flex" s />
        <h2>Edit</h2>
      </button>
      <div className="flex w-1.5 h-full" />
      <button
        onClick={handleDelete}
        className="flex flex-row items-center space-x-1 text-xl bg-theme-3 rounded-r-full px-10 py-2 text-theme-1 cursor-pointer transform transition-all duration-200 hover:shadow-lg hover:scale-[103%]"
        onMouseLeave={() => {
          if (confirmDelete) setConfirmDelete(false);
        }}
      >
        <Trash className="flex" />
        <h2>{confirmDelete ? "Are You Sure?" : "Delete"}</h2>
      </button>
    </div>
  );
};

export default MutationBar;
