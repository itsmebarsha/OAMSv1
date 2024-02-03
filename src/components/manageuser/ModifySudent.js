/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ModifyStudent = ({ isModalOpen, closeModal, user, onSaveSuccess }) => {
  if (!isModalOpen) return null;
  const schoolStore = userStore();
  const [studentName, setStudentName] = useState(user.studentName || "");
  const [semester, setSemester] = useState(user.studentSemester || "");
  const [id, setId] = useState(user.studentId || "");
  const [email, setEmail] = useState(user.studentEmail || "");
  const [address, setAddress] = useState(user.studentAddress || "");
  const [phone, setPhone] = useState(user.studentPhone || "");
  const schoolCode = schoolStore.userData.schoolCode;
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if ((studentName || semester || id || email || address || phone) != "") {
      const formData = {
        schoolCode: schoolStore.userData.schoolCode,
        studentName: studentName,
        semester: semester,
        id: id,
        email: email,
        address: address,
        phone: phone,
      };
      console.log(formData);
      try {
        // Make the POST request using Axios
        const response = await axios.post(
          "/api/adddata/modifystudent",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the API response here if needed
        console.log("API Response:", response.data);
        alert("Student updated successfully");
        if (onSaveSuccess) {
          onSaveSuccess(true);
        }
        // Do something with the response data or show a success message
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error("API Error:", error.message);
        alert("Failed to update student");
        // Show an error message or take appropriate action
      }
    } else {
      alert("Nothing to update");
    }
  };
  return (
    <>
      <div className=" z-50 fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg flex flex-col">
          {/* <!-- Modal Header --> */}
          <div className="bg-gray-200 px-4 py-2 grid grid-cols-1 md:grid-cols-1 rounded-t-lg">
            <div className="flex items-center space-x-4">
              <h3 className="truncate font-semibold">Modify Student</h3>
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
                  <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      <div className="form-group col-span-3 lg:col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          ID No
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={id} // Set the value of the input to the generated ID
                          readOnly // Make the input read-only
                        />
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name *
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={studentName}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                      </div>

                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Semester *
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={semester}
                          onChange={(e) => setSemester(e.target.value)}>
                          <option value="">Please Select Semester *</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                      </div>

                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          placeholder=""
                          value={email}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          disabled
                        />
                      </div>

                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={address}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Phone
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={phone}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="form-group col-span-3">
                        <div className="flex items-center space-x-4 mt-8">
                          <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            Save
                          </button>
                          <button
                            type="reset"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Modal Footer --> */}
        </div>
      </div>
    </>
  );
};

export default ModifyStudent;
