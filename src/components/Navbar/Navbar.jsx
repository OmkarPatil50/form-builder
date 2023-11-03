import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-slate-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">
          Form Builder
        </NavLink>
        <ul className="flex space-x-4">
          <NavLink to="/" className="text-white hover:text-gray-300">
            Preview
          </NavLink>
          <NavLink
            to="/add/categorize"
            className="text-white hover:text-gray-300"
          >
            Categorize
          </NavLink>
          <NavLink to="/add/cloze" className="text-white hover:text-gray-300">
            Cloze
          </NavLink>
          <NavLink to="/add/mcq" className="text-white hover:text-gray-300">
            MCQ
          </NavLink>
          <NavLink to="/test" className="text-white hover:text-gray-300">
            Take Test
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
