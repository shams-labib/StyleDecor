import React from "react";
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import Logo from "../Shared/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-t-3xl p-10 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        {/* Links */}
        <nav className="grid grid-flow-col gap-6 text-gray-700 dark:text-gray-300">
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Contact
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Jobs
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Press Kit
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a
            href="#"
            className="hover:text-blue-500 transition-transform transform hover:scale-110"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-red-500 transition-transform transform hover:scale-110"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="hover:text-blue-700 transition-transform transform hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      {/* Copyright */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} StyleDecor. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
