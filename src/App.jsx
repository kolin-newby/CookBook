import React, { useState } from "react";
import Recipes from "./pages/recipes";
import Navbar from "./components/navbar";

import AuthProvider from "./components/auth/AuthProvider";
import { RequireAuth } from "./components/auth/RequireAuth";

import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/about";
import AdminPage from "./pages/admin-page";
import LoginPage from "./pages/login-page";

const App = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full h-screen justify-center items-center bg-yellow-950/20 overflow-hidden">
      <BrowserRouter>
        <AuthProvider>
          <Navbar open={navOpen} setOpen={setNavOpen} />
          <div
            className="flex w-full h-app-full"
            onClick={() => {
              if (navOpen) setNavOpen(false);
            }}
          >
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="/" element={<About />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route path="login" element={<LoginPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
