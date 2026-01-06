import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Recipes from "./pages/recipes";
import Navbar from "./components/navbar";

import AuthProvider from "./components/auth/AuthProvider";
import { RequireAuth } from "./components/auth/RequireAuth";

import { BrowserRouter, Routes, Route } from "react-router";
import About from "./pages/about";
import AccountPage from "./pages/account-page";
import LoginPage from "./pages/login-page";

const queryClient = new QueryClient();

const App = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="relative flex flex-col w-full h-screen justify-center items-center bg-yellow-950/20 overflow-hidden">
      <QueryClientProvider client={queryClient}>
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
                  <Route path="/recipes/:mode" element={<Recipes />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/account" element={<AccountPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
              </Routes>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
