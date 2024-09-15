import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [credenditals, changeCredenitals] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    //console.log(json.stringify({email:credenditals.email,password:credenditals.password}))
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenditals.email,
        password: credenditals.password,
      })
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Please enter valid credential");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credenditals.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };
  const onChange = (event) => {
    changeCredenitals({
      ...credenditals,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>

      <form className=" max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="all credential are secure"
            name="email"
            value={credenditals.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="all credential are secure"
            name="password"
            value={credenditals.password}
            onChange={onChange}
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
        <Link
          to="/createUser"
          type="submit"
          className="sm:my-2 mx-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-white-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Signup
        </Link>
      </form>
    </>
  );
};

export default Login;
