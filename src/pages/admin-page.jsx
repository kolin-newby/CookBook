import { useState } from "react";
import { useAuth } from "./../components/auth/AuthContext";
import RecipeModal from "../components/recipe-modal";

const AdminPage = () => {
  const { user, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="relative flex flex-col space-y-4 w-full h-full items-center justify-center text-theme-5">
      <div className="flex flex-row text-xl items-center justify-center space-x-4">
        <div className="flex flex-row">
          <span className="flex">Signed in as: </span>
          <span className="flex">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-2xl flex bg-theme-3 text-theme-1 rounded-full py-2 px-10 shadow transform transition-all duration-300 hover:shadow-xl hover:scale-[103%] cursor-pointer"
        >
          <h2>Sign Out</h2>
        </button>
      </div>
      <div className="flex w-full h-1 bg-theme-4" />
      <button
        onClick={() => setShowModal(!showModal)}
        className="text-2xl flex bg-theme-3 text-theme-1 rounded-full py-2 px-10 shadow transform transition-all duration-300 hover:shadow-xl hover:scale-[103%] cursor-pointer"
      >
        <h2>Add Recipe</h2>
      </button>
      <RecipeModal show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default AdminPage;
