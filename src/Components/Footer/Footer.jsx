import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from "../Shared/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-t-3xl p-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your trusted partner for premium home decoration and interior
            solutions.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone /> +880 1234 567890
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@styleDecor.com
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Working Hours</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon - Fri: 9:00 AM - 6:00 PM</li>
            <li>Sat: 10:00 AM - 4:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
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
