import { Compass } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const Navbar = ({ open, setOpen }) => {
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
    {
      title: "Account",
      path: "/account",
      icon: <span></span>,
    },
  ];

  return (
    <div className="sticky z-10 top-0 inset-x-0 h-nav w-full flex md:space-x-12 text-yellow-950 px-3 py-5">
      <div className="absolute -z-10 inset-0 w-full h-full bg-linear-to-r from-theme-4 to-theme-3 shadow-lg" />
      <div className="flex flex-row bg-theme-1 rounded-[50px] w-full md:w-auto h-full px-6 md:px-8 inset-shadow-sm items-center space-x-4">
        <button onClick={() => setOpen(!open)}>
          <Compass
            className="flex md:hidden animate-compass-spin"
            size={"30px"}
          />
        </button>
        <div className="flex w-full justify-center">
          <div className="flex flex-col md:flex-row md:space-x-2 items-start">
            <div className="flex flex-row space-x-1 md:space-x-0 md:flex-col">
              <h2 className="flex justify-end">get</h2>
              <h2 className="flex justify-end">in</h2>
              <h2 className="flex justify-end">the</h2>
            </div>
            <div className="flex md:flex-col text-xl md:text-3xl space-x-1.5 md:space-x-0">
              <h1 className="flex md:w-full text-nowrap">MOTHER FKN</h1>
              <h1 className="flex md:w-full justify-start">KITCHEN</h1>
            </div>
          </div>
        </div>
      </div>
      <nav className="hidden md:flex bg-theme-1 rounded-[50px] h-full w-1/2 justify-evenly inset-shadow-sm items-center px-8 space-x-10">
        {navLinks.map((item, index) => (
          <NavLink key={`nav-item-${index}`} to={item.path}>
            <h2 className="text-lg">{item.title.toUpperCase()}</h2>
          </NavLink>
        ))}
      </nav>
      <nav
        className={`flex flex-col absolute top-full inset-x-0 -z-20 md:hidden bg-theme-2 rounded-b space-y-2 py-2 px-3 items-center shadow transition-transform duration-300 transform ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {navLinks.map((item, index) => (
          <NavLink
            key={`nav-item-${index}`}
            to={item.path}
            className={
              "flex w-full py-3 rounded-[50px] justify-center bg-theme-5/10 inset-shadow-sm"
            }
            onClick={() => setOpen(false)}
          >
            <h2 className="text-lg">{item.title.toUpperCase()}</h2>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
