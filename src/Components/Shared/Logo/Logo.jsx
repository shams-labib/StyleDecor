// Logo.jsx
import React from "react";
import logoImg from "../../../assets/logo.png"; // ekhane logo image path
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200"
    >
      <img
        src={logoImg}
        alt="Logo"
        className="md:h-12 md:w-12 w-10 h-10 rounded-full shadow-md"
      />
      <span className="md:text-2xl font-bold text-gray-800 dark:text-white">
        StyleDecor
      </span>
    </Link>
  );
};

export default Logo;
