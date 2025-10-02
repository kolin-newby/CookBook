import React, { useEffect, useState } from "react";
import Recipes from "./pages/recipes";
import Navbar from "./components/navbar";

import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/about";

const App = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center bg-yellow-950/20">
      <BrowserRouter className="flex w-full h-1/2">
        <Navbar />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
