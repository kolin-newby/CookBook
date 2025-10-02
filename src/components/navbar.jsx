import React from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const navLinks = [
    {
      title: "Home",
      path: "/",
      icon: <span></span>,
    },
    {
      title: "Recipes",
      path: "/recipes",
      icon: <span></span>,
    },
  ];

  return (
    <div className="sticky top-0 inset-x-0 h-nav-height w-full flex space-x-12 text-yellow-950 bg-gradient-to-r from-orange-950 to-amber-900 mb-6 shadow-lg px-3 py-5">
      <div className="flex flex-row bg-[#d9d2cd] rounded-full h-full px-8 space-x-2 shadow items-center">
        <div className="flex flex-col">
          <h2 className="flex justify-end">get</h2>
          <h2 className="flex justify-end">in</h2>
          <h2 className="flex justify-end">the</h2>
        </div>
        <div className="flex flex-col">
          <h1 className="flex w-full text-3xl">MOTHER FKN</h1>
          <h1 className="flex w-full text-3xl justify-start">KITCHEN</h1>
        </div>
      </div>
      <nav className="flex bg-[#d9d2cd] rounded-full h-full w-1/2 justify-evenly shadow items-center px-8 space-x-10">
        {navLinks.map((item) => (
          <NavLink to={item.path}>
            <h2 className="text-lg">{item.title.toUpperCase()}</h2>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
