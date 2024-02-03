/** @format */

import axios from "axios";
import Link from "next/link";

import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

function register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform validation
    if (!isEmailValid(formData.email)) {
      alert("Invalid email address.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const formDataToSend = { ...formData, role: "admin" };
    console.log(formDataToSend);
    const response = axios
      .post("/api/authentication/register", formDataToSend)
      .then((response) => {
        alert(
          `Successful Registration. Your School Code: ${response.data.schoolCode}`
        );
        router.push("/auth/signin"); // Redirect to signin page
      })
      .catch((error) => {
        // Handle error response, if needed
        alert(" Registration failed");
      });
  };
  return (
    <>
      <div className="h-[100vh] w-full">
        <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center ">
          <main className="w-full  mx-auto flex flex-row ">
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
                      Sign up
                    </h1>
                    <p className="mt-2 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?
                      <Link
                        className="text-blue-600 decoration-2 ml-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href={"/auth/signin"}>
                        Sign in here
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
                            Full Name
                          </label>
                          <div className="relative">
                            <input
                              type="name"
                              id="name"
                              name="name"
                              value={formData.name}
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
                            Institution Name
                          </label>
                          <div className="relative">
                            <input
                              type="name"
                              id="name"
                              name="schoolName"
                              value={formData.schoolName}
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

                        <div>
                          <label
                            for="confirm-password"
                            className="block text-sm mb-2 dark:text-white">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="confirm-password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                              aria-describedby="confirm-password-error"
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
                            id="confirm-password-error">
                            Password does not match the password
                          </p>
                        </div>

                        <div className="flex items-center">
                          <div className="flex">
                            <input
                              id="agree-terms"
                              name="agreeTerms"
                              type="checkbox"
                              checked={formData.agreeTerms}
                              onChange={handleChange}
                              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            />
                          </div>
                          <div className="ms-3">
                            <label
                              for="remember-me"
                              className="text-sm dark:text-white">
                              I accept the{" "}
                              <a
                                className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                href="#">
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default register;
