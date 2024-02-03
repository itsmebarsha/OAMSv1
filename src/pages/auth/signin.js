/** @format */

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { useDispatch } from "react-redux";
import { login, loginUser } from "@/redux/reducers/userSlice";
import Image from "next/image";
import Link from "next/link";

function signin() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    schoolCode: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter(); // Create a router object
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation if needed
    // ...

    // Replace 'your-server-endpoint' with the actual endpoint where you want to send the form data
    axios
      .post("/api/authentication/signin", formData)
      .then((response) => {
        alert("Successful Login");
        const role = response.data.role;
        const email = response.data.email;
        dispatch(loginUser({ role: role, userDetail: email }));

        router.push("/");
      })
      .catch((error) => {
        alert("Login Failed. Invalid credentials");
        // Handle error response, if needed
      });
  };

  return (
    <>
      <div className="h-[100vh] w-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center ">
          <div className="w-full  mx-auto flex flex-row ">
            <div className=" hidden md:block my-auto basis-[50%]">
              <div className="w-full flex justify-center">
                <img
                  className=" text-center h-auto w-32"
                  src="/img/logo2.png"
                  alt=""
                />
              </div>
              <h2 className=" flex text-center  text-3xl justify-center mt-10 font-extrabold text-slate-900 ">
                Welcome to Assignment Management System
              </h2>
              <p className="flex text-center justify-center mt-5 font-medium">
                Designed by: Team Smart
              </p>
            </div>
            <div className=" basis-[100%] md:basis-[50%]">
              <div className="mt-7  w-96 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Login to portal
                    </h1>
                    <p className="mt-2 text-sm mr-2 text-gray-600 dark:text-gray-400">
                      New User
                      <Link
                        className="text-blue-600 decoration-2 ml-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href={"/admin/register"}>
                        Register Here
                      </Link>
                    </p>
                  </div>

                  <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-y-4">
                        <div>
                          <label
                            for="email"
                            className="block text-sm mb-2 dark:text-white">
                            Institution Code
                          </label>
                          <div className="relative">
                            <input
                              type="name"
                              id="name"
                              name="schoolCode"
                              value={formData.schoolCode}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              aria-describedby="email-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            for="email"
                            className="block text-sm mb-2 dark:text-white">
                            Email address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              aria-describedby="email-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="email-error">
                            Please include a valid email address so we can get
                            back to you
                          </p>
                        </div>
                        <div>
                          <label
                            for="password"
                            className="block text-sm mb-2 dark:text-white">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              aria-describedby="password-error"
                            />
                            <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                              <svg
                                className="h-5 w-5 text-red-500"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                              </svg>
                            </div>
                          </div>
                          <p
                            className="hidden text-xs text-red-600 mt-2"
                            id="password-error">
                            8+ characters required
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default signin;
