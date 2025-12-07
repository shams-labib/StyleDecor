import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiUserPlus } from "react-icons/fi";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from "../assets/logo.png";
import { FaListOl, FaUserShield } from "react-icons/fa";
import { Album, ContactRound, LucidePencilRuler } from "lucide-react";
import { BsCart4 } from "react-icons/bs";
import { History } from "lucide-react";
import { BookOpenText } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open dark:bg-gray-900">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      {/* Main content */}
      <div className="drawer-content flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Navbar */}
        <nav className="navbar bg-white shadow-md px-4 py-3 sticky top-0 z-50 dark:bg-gray-900">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="text-xl font-bold text-primary ml-2 ">Dashboard</div>
        </nav>

        {/* Page content */}
        <div className="p-6 ">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col w-64 bg-white shadow-md dark:bg-gray-900">
          {/* Logo */}
          <div className="flex items-center justify-center py-6 border-b">
            <img src={logoImg} className="w-20 rounded-full" alt="Logo" />
          </div>

          {/* Menu */}
          <ul className="menu p-4 space-y-2 text-gray-700">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <AiOutlineHome size={22} />
                Homepage
              </NavLink>
            </li>
            {/* User page */}
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <ContactRound size={22} />
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-bookings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <Album size={22} />
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <History />
                Payment History
              </NavLink>
            </li>
            {/* admin */}
            <li>
              <NavLink
                to="/dashboard/manage-bookings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <BookOpenText />
                Manage Bookings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/create-decorator"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <FiUserPlus size={22} />
                Create Decorator
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <FaUserShield size={22} />
                All Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/decorator-list"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <FaListOl size={22} />
                Decorator List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/create-services"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <LucidePencilRuler size={22} />
                Create Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/services-list"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 ${
                    isActive ? "bg-primary/20 text-primary font-semibold" : ""
                  }`
                }
              >
                <BsCart4 size={22} />
                Services List
              </NavLink>
            </li>
            <li>
              <button className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-primary/10 w-full text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
