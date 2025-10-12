import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import { DeleteRecipe } from "../hooks";
import RecipeModal from "../recipe-modal";

const MutationBar = ({ recipe }) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-row space-x-4 items-center justify-center pt-1.5">
      <RecipeModal
        show={showModal}
        setShow={setShowModal}
        editRecipe={recipe}
      />
      <button
        onClick={handleEdit}
        className="flex flex-row items-center space-x-1 text-xl bg-theme-3 rounded-full px-10 py-2 text-theme-1 cursor-pointer transform transition-all duration-200 shadow hover:shadow-lg hover:scale-[103%]"
      >
        <h2>Edit</h2>
        <Edit className="flex" s />
      </button>
      <button
        onClick={handleDelete}
        className="flex flex-row items-center space-x-1 text-xl bg-theme-3 rounded-full px-10 py-2 text-theme-1 cursor-pointer transform transition-all duration-200 shadow hover:shadow-lg hover:scale-[103%]"
        onMouseLeave={() => {
          if (confirmDelete) setConfirmDelete(false);
        }}
      >
        <h2>{confirmDelete ? "Are You Sure?" : "Delete"}</h2>
        <Trash className="flex" />
      </button>
    </div>
  );
};

export default MutationBar;
