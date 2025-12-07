import React from "react";
import logoImg from "../../../assets/logo.png"; // logo image path
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      className="
        flex items-center gap-3 cursor-pointer 
        transform transition-transform duration-300 hover:scale-110
      "
    >
      {/* Logo Image */}
      <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full shadow-lg overflow-hidden">
        <img
          src={logoImg}
          alt="Logo"
          className="w-full h-full object-cover rounded-full"
        />
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 opacity-0 hover:opacity-70 transition-opacity duration-300"></span>
      </div>

      {/* Logo Text */}
      <span
        className="text-lg md:text-2xl font-extrabold text-gray-800 dark:text-white 
                       bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500
                       dark:from-indigo-400 dark:to-purple-400
                       transition-all duration-500"
      >
        StyleDecor
      </span>
    </Link>
  );
};

export default Logo;
