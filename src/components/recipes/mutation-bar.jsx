import React, { useState } from "react";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import UseDeleteRecipeMutation from "./hooks/use-delete-recipe-mutation";
import UseNotify from "../notifications/UseNotify";

const MutationBar = ({
  className = "",
  recipe,
  setRecipe,
  setShowModal,
  onDelete = () => null,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteRecipe = UseDeleteRecipeMutation();
  const notify = UseNotify();

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    try {
      deleteRecipe.mutateAsync(recipe.id);
      onDelete();
      notify("Successfully deleted recipe!");
    } catch (err) {
      notify(`Failed to delete recipe: ${err.message}`);
    }
  };

  const handleEdit = () => {
    setRecipe(recipe);
    setShowModal(true);
  };

  return (
    <div
      className={`${className} flex flex-col w-full bg-theme-4 rounded-3xl shadow`}
    >
      <div
        className={
          "flex w-full space-x-1.5 p-1 flex-row items-center justify-center"
        }
      >
        <button
          onClick={handleEdit}
          className="flex flex-row w-full items-center justify-center space-x-1 text-lg bg-theme-2 rounded-[50px] p-2 text-theme-5 cursor-pointer transform transition-all duration-200 hover:bg-black/20 hover:text-theme-2 hover:inset-shadow-sm"
        >
          <Edit className="flex" />
          <h2>Edit</h2>
        </button>
        <button
          onClick={handleDelete}
          className="flex flex-row w-full items-center justify-center space-x-1 text-lg bg-theme-2 rounded-[50px] p-2 text-theme-5 cursor-pointer transform transition-all duration-200 hover:bg-black/20 hover:text-theme-2 hover:inset-shadow-sm"
          onMouseLeave={() => {
            if (confirmDelete) setConfirmDelete(false);
          }}
        >
          {deleteRecipe.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Trash className="flex" />
          )}
          <h2>{confirmDelete ? "Confirm?" : "Delete"}</h2>
        </button>
      </div>
      <div className="flex items-center justify-center font-bold text-theme-2 p-1">
        {recipe.active ? "ACTIVE" : "INACTIVE"}
      </div>
    </div>
  );
};

export default MutationBar;
