import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Model from "../Model";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

const Header = () => {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Food Order
            </span>
          </Link>
          <div
            className=" items-center justify-between  w-full  md:flex md:w-auto"
            id="navbar-sticky"
          >
            <ul className="flex justify-between p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li>
                  <Link
                    to="/myOrder"
                    className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
                  >
                    My Order
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!localStorage.getItem("authToken") ? (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/createUser"
                      className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCartView(true)}
                    type="button"
                    className="inline-flex items-center text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    My Carts{" "}
                    {!data.length == 0 ? (
                      <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-slate-200 bg-slate-700 rounded-full">
                        {data.length}
                      </span>
                    ) : null}
                  </button>
                  {cartView ? (
                    <Model onClose={() => setCartView(false)}>
                      <Cart />
                    </Model>
                  ) : null}
                  <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
