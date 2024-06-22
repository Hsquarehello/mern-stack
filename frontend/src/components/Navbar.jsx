import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";

const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    let res = await axios.post("/api/users/logout");
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/sign-in");
    }
  };
  return (
    <>
      {/* <nav className="py-[20px] px-[50px] flex justify-between items-center max-w-[1850px] mx-auto">
        <div>
          <h1 className="text-blue-100 text-2xl font-bold cursor-pointer">
            Recipecity
          </h1>
        </div>
        <ul className="flex items-center w-full gap-[40px] justify-end">
          <li>
            <NavLink
              to="/"
              className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline">
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline">
              Contact
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                to="/sign-up"
                className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline">
                Sign Up
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink
                to="/sign-in"
                className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline">
                Login
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <button
                className="text-white text-[16px] font-bold cursor-pointer hover:text-orange-400 hover:underline"
                onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav> */}

      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/* Hamburger Menu */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => {
                  if (isOpen) setIsOpen(false);
                  else setIsOpen(true);
                }}
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                ariaControls="mobile-menu"
                ariaExpanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  ariaHidden="true"
                  dataSlot="icon">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  ariaHidden="true"
                  dataSlot="icon">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              {/* Logo */}
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>

              {/* NavLinks */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to="/"
                    className="rounded-md px-3 py-2 text-sm font-medium hover:bg-black text-white"
                    ariaCurrent="page">
                    Home
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-black hover:text-white">
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-black hover:text-white">
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user && (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      ariaExpanded="false"
                      ariaHaspopup="true">
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  {/* <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0">
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1">
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2">
                    Sign out
                  </a>
                </div> */}
                </div>
              )}
              {user && (
                <button
                  onClick={logout}
                  to="/logout"
                  class="block rounded-md px-3 py-2 text-base font-medium text-red-500">
                  Logout
                </button>
              )}
              {!user && (
                <div className="flex gap-1">
                  <Link
                    to="/sign-in"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:text-white bg-blue-700">
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile NavLinks */}
        <div className={`${isOpen ? "block" : "hidden"}`} id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <NavLink
              to="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white"
              ariaCurrent="page">
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white">
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-900 hover:text-white">
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
