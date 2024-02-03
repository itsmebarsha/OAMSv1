/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";

const StudentCred = ({ isModalOpen, closeModal, user, onSaveSuccess }) => {
  if (!isModalOpen) return null;
  const schoolStore = userStore();
  const [name, setName] = useState(user.studentName || "");
  const [email, setEmail] = useState(user.studentEmail || "");
  const [password, setPassword] = useState(user.studentPassword || "");
  const [role, setRole] = useState("student");
  const schoolCode = schoolStore.userData.schoolCode;
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if ((email || password) != "") {
      const formData = {
        schoolCode: schoolCode,
        name: name,
        email: email,
        password: password,
        role: role,
      };
      console.log(formData);

      // Handle the API response here if needed
      axios
        .post("/api/adddata/saveCredentialData", formData)
        .then((response) => {
          alert("User saved successfully");
        })
        .catch((error) => {
          // Handle error response, if needed
          alert("Failed to save password");
        });

      if (onSaveSuccess) {
        onSaveSuccess(true);
      }
    } else {
      alert("Nothing to update");
    }
  };

  const generateRandomPassword = () => {
    const randomPassword = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setPassword(randomPassword);
  };
  return (
    <>
      <div className=" z-50 fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg flex flex-col">
          {/* <!-- Modal Header --> */}
          <div className="bg-gray-200 px-4 py-2 grid grid-cols-1 md:grid-cols-1 rounded-t-lg">
            <div className="flex items-center space-x-4">
              <h3 className="truncate font-semibold"> Student login details</h3>
            </div>

            <button
              className="col-start-3 bg-transparent p-1  justify-self-end"
              type="button"
              onClick={closeModal}>
              <svg
                className="w-6 h-6 text-gray-500 hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* <!-- Modal Body with Scrolling --> */}
          <div className="px-1 py-1 flex-grow overflow-y-auto mb-5">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="col-span-3 lg:col-span-2">
                <div className=" p-6">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="form-group col-span-3 lg:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        placeholder=""
                        value={email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group col-span-3 lg:col-span-1">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                      </label>
                      <input
                        type="text"
                        placeholder=""
                        value={password}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="my-auto p-6  text-white">
                      <button
                        className="text-white bg-green-600 border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={generateRandomPassword}>
                        Auto Generate
                      </button>
                    </div>
                    <div className="col-12 form-group mg-t-8">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleFormSubmit}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Modal Footer --> */}
      </div>
    </>
  );
};

export default StudentCred;
