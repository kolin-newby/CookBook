import { useState } from "react";
import { useAuth } from "../components/auth/AuthContext";
import RecipeModal from "../components/recipes/recipe-modal/recipe-modal";
import { Edit, Plus } from "lucide-react";
import { NavLink } from "react-router";

const AccountPage = () => {
  const { user, signOut, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="relative flex flex-col space-y-4 w-full h-full items-center justify-center text-theme-5 p-4">
      <div className="flex flex-col text-xl w-full items-center justify-center space-y-4 bg-theme-4/10 inset-shadow-sm rounded-[50px] p-10">
        <h2 className="flex text-xl md:text-2xl">Account</h2>
        <div className="flex flex-row">
          <span className="flex">Email: </span>
          <span className="flex">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xl md:text-2xl flex bg-theme-3 text-theme-1 rounded-[50px] py-2 px-10 shadow transform transition-all duration-300 hover:shadow-xl hover:scale-[103%] cursor-pointer"
        >
          <h2>Sign Out</h2>
        </button>
      </div>
      {isAdmin && (
        <div className="flex flex-col w-full bg-theme-4/10 inset-shadow-sm rounded-[50px] p-10 space-y-4 items-center justify-center">
          <h2 className="flex text-xl md:text-2xl">Content Management</h2>
          <button
            onClick={() => setShowModal(!showModal)}
            className="text-xl md:text-2xl flex items-center justify-center space-x-2 bg-theme-3 text-theme-1 rounded-[50px] py-2 px-10 shadow transform transition-all duration-300 hover:shadow-xl hover:scale-[103%] cursor-pointer"
          >
            <Plus size={"30px"} />
            <h2>Add Recipe</h2>
          </button>
          <NavLink
            to={"/recipes/edit"}
            className="text-xl md:text-2xl flex items-center justify-center space-x-2 bg-theme-3 text-theme-1 rounded-[50px] py-2 px-10 shadow transform transition-all duration-300 hover:shadow-xl hover:scale-[103%] cursor-pointer"
          >
            <Edit size={"30px"} />
            <h2>Manage Recipes</h2>
          </NavLink>
          <RecipeModal show={showModal} setShow={setShowModal} />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
