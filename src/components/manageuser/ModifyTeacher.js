/** @format */

import MultipleSelect from "@/utlis/MUltipleSelect";
import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ModifyTeacher = ({ isModalOpen, closeModal, user, onSaveSuccess }) => {
  if (!isModalOpen) return null;
  const schoolStore = userStore();
  const [teacherName, setTeacherName] = useState(user.teacherName || "");
  const [teacherGender, setTeacherGender] = useState(user.teacherGender || "");
  const [teacherDob, setTeacherDob] = useState(user.teacherDob || "");
  const [teacherId, setTeacherId] = useState(user.teacherId || "");
  const [teacherEmail, setTeacherEmail] = useState(user.teacherEmail || "");
  const [assignSubject, setAssignSubject] = useState(
    user.assignedSubject || []
  );
  const [subjectList, setSubjectList] = useState([]);
  const [teacherAddress, setTeacherAddress] = useState(
    user.teacherAddress || ""
  );
  const [teacherPhone, setTeacherPhone] = useState(user.teacherPhone || "");
  const schoolCode = schoolStore.userData.schoolCode;
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      (teacherName ||
        teacherGender ||
        teacherDob ||
        teacherId ||
        teacherEmail ||
        teacherAddress ||
        teacherPhone) != "" &&
      assignSubject != []
    ) {
      const formData = {
        schoolCode: schoolStore.userData.schoolCode,
        teacherName: teacherName,
        gender: teacherGender,
        dob: teacherDob,
        id: teacherId,
        email: teacherEmail,
        address: teacherAddress,
        phone: teacherPhone,
        assignedSubject: assignSubject,
      };
      console.log(formData);
      try {
        // Make the POST request using Axios
        const response = await axios.post(
          "/api/adddata/modifyteacher",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle the API response here if needed
        console.log("API Response:", response.data);
        alert("Teacher updated successfully");
        if (onSaveSuccess) {
          onSaveSuccess(true);
        }
        // Do something with the response data or show a success message
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error("API Error:", error.message);
        alert("Failed to update teacher");
        // Show an error message or take appropriate action
      }
    } else {
      alert("Nothing to update");
    }
  };

  const [data, setData] = useState([]);

  // Define the fetchData function outside of useEffect
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/getData/subjectData/${schoolCode}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  useEffect(() => {
    // Update subjectList when data changes
    setSubjectList(
      data.map((item) => item.subjectCode + "-" + item.subjectName)
    );
  }, [data]);

  const handleItemsChange = (items) => {
    setAssignSubject(items);
  };

  const renderItems = (item) => {
    const isSelected = assignSubject.includes(item);

    return (
      <div className="flex justify-between ">
        <div>{item}</div>
        {isSelected && (
          <div>
            {" "}
            <svg
              className="ml-2 h-4 w-4 fill-current text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M17.293 4.293a1 1 0 0 1 1.414 1.414l-11 11a1 1 0 0 1-1.414 0l-6-6a1 1 0 1 1 1.414-1.414L6 14.086l10.293-10.293a1 1 0 0 1 1.414 0z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      <div className=" z-50 fixed inset-0 p-2 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg flex flex-col">
          {/* <!-- Modal Header --> */}
          <div className="bg-gray-200 px-4 py-2 grid grid-cols-1 md:grid-cols-1 rounded-t-lg">
            <div className="flex items-center space-x-4">
              <h3 className="truncate font-semibold">Modify Teacher</h3>
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
                          value={teacherId} // Set the value of the input to the generated ID
                          readOnly
                        />
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name *
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          value={teacherName}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setTeacherName(e.target.value)}
                        />
                      </div>

                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Gender *
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          onChange={(e) => setTeacherGender(e.target.value)}
                          value={teacherGender}>
                          <option value="">Please Select Gender *</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Others</option>
                        </select>
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Date Of Birth *
                        </label>
                        <input
                          type="date"
                          placeholder="dd/mm/yyyy"
                          className="form-control air-datepicker"
                          value={teacherDob}
                          onChange={(e) => setTeacherDob(e.target.value)}
                        />
                      </div>

                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          E-Mail
                        </label>
                        <input
                          type="email"
                          placeholder=""
                          value={teacherEmail}
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
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={teacherAddress}
                          onChange={(e) => setTeacherAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-3 col-lg-6 col-12 form-group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Phone
                        </label>
                        <input
                          type="text"
                          placeholder=""
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={teacherPhone}
                          onChange={(e) => setTeacherPhone(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-span-3 lg:col-span-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Assigned Subject
                        </label>
                        <MultipleSelect
                          value={assignSubject}
                          onChange={handleItemsChange}
                          render={renderItems}
                          items={subjectList}
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

export default ModifyTeacher;
