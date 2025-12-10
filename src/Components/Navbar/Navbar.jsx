import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ThemeToggle from "../Shared/Theme/Theme";
import CustomNavLink from "../Shared/Custom Navlink/CustomNavlink";
import Logo from "../Shared/Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { HiOutlineViewList } from "react-icons/hi";
import { motion } from "framer-motion";
import { Home, Layers, Info, MapPinned, Phone } from "lucide-react";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Click outside handle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    logOutUser()
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Log Out Success!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const links = (
    <>
      <li>
        <CustomNavLink to="/" onClick={() => setDrawerOpen(false)}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Home size={18} />
            <span>Home</span>
          </motion.div>
        </CustomNavLink>
      </li>

      <li>
        <CustomNavLink to="/services" onClick={() => setDrawerOpen(false)}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.2 }}
          >
            <Layers size={18} />
            <span>Services</span>
          </motion.div>
        </CustomNavLink>
      </li>

      <li>
        <CustomNavLink to="/about" onClick={() => setDrawerOpen(false)}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ rotate: 3 }}
            transition={{ duration: 0.2 }}
          >
            <Info size={18} />
            <span>About Us</span>
          </motion.div>
        </CustomNavLink>
      </li>

      <li>
        <CustomNavLink to="/contact" onClick={() => setDrawerOpen(false)}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <Phone size={18} />
            <span>Contact</span>
          </motion.div>
        </CustomNavLink>
      </li>
      <li>
        <CustomNavLink to="/coveragePage" onClick={() => setDrawerOpen(false)}>
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <Phone size={18} />
            <span>Coverage</span>
          </motion.div>
        </CustomNavLink>
      </li>

      {user && (
        <li>
          <CustomNavLink to="/dashboard" onClick={() => setDrawerOpen(false)}>
            Dashboard
          </CustomNavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      <div className=" bg-base-100 shadow-md sticky top-0 z-50 ">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            {/* Drawer toggle button */}
            <button
              className="btn btn-ghost lg:hidden"
              onClick={() => setDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <span>
              {" "}
              <Logo></Logo>
            </span>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-5">{links}</ul>
          </div>

          <div className="navbar-end gap-5 relative px-5 md:px-0">
            <span className="hidden md:block">
              <ThemeToggle />
            </span>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Image */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center border-blue-500 border px-2 py-1 rounded-full cursor-pointer"
                >
                  <img
                    src={user.photoURL || "/default-user.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full "
                  />
                  <span>
                    <HiOutlineViewList size={24} />
                  </span>
                </div>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 shadow-xl rounded-2xl py-3 z-50">
                    <p className="px-4 py-2 text-gray-800 font-semibold text-sm">
                      {user.displayName || "User"}
                    </p>

                    <hr className="opacity-30" />

                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium"
                    >
                      📊 <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition font-medium w-full text-left"
                    >
                      🚪 <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/login"} className="btn bg-primary text-white">
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-xl transform transition-transform duration-300 z-50 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Logo className="h-8 w-8" /> {/* Logo size adjustable */}
            <ThemeToggle />
          </div>
          <button
            className="btn btn-ghost text-xl"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="menu p-4 flex flex-col gap-3 w-full">{links}</ul>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
