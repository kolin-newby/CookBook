import React, { useEffect, useState } from "react";
import Recipes from "./pages/recipes";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-yellow-950/20">
      <Navbar />
      <Recipes />
    </div>
  );
};

export default App;
