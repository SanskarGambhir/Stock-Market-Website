import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            <Link to="/">MyBrand</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-200">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-gray-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-200">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <Link to="/" className="block px-4 py-2 text-white hover:bg-blue-500">
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            About
          </Link>
          <Link
            to="/services"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-white hover:bg-blue-500"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
