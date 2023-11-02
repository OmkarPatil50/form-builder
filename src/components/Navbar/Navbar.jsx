import React from 'react'
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="bg-slate-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold">Form Builder</NavLink>
        <ul className="flex space-x-4">
          <NavLink to='/' className="text-white hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to='/forms' className="text-white hover:text-gray-300">
            Forms
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};



export default Navbar
