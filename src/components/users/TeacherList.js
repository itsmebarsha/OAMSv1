/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import ModifyTeacher from "../manageuser/ModifyTeacher";
import TeacherCred from "../loginCredential/TeacherCred";
import { userStore } from "@/utlis/Store";
function TeacherList() {
  const [data, setData] = useState([]);
  const schoolStore = userStore();
  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(""); // State to hold the selected student for modification
  const [searchTerm, setSearchTerm] = useState("");
  const schoolCode = schoolStore.userData.schoolCode;
  async function fetchData() {
    try {
      const response = await axios.get(
        `/api/getData/teacherData/${schoolCode}`
      ); // This points to your API route
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // Function to filter data based on search criteria
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof value === "number") {
        // Convert numbers to strings before searching
        return value.toString().includes(searchTerm.toLowerCase());
      }
      return false;
    })
  );

  const handleModify = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };
  const handleLoginGeneration = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModalLogin(true);
  };
  const handleRemove = async (teacherEmail) => {
    try {
      console.log(teacherEmail);
      // Make an API request to delete the teacher with the given ID
      const response = await axios.delete(
        `/api/removeData/removeTeacher?email=${teacherEmail}&schoolCode=${schoolCode}`
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        console.log("Teacher removed successfully");
        // After successful deletion, update the data by refetching
        const dataResponse = await axios.get(
          `/api/getData/teacherData/${schoolCode}`
        );
        setData(dataResponse.data);
      } else if (response.status === 404) {
        console.log("teacher not found");
      } else {
        console.log("Failed to remove teacher");
      }
    } catch (error) {
      console.error("Error removing teacher:", error);
    }
  };

  const handleSaveSuccess = (success) => {
    if (success) {
      // Do something in response to successful save
      console.log("Teacher data saved successfully");
      setShowModal(false); // Close the modal
      fetchData();
    }
  };

  const handleLoginSaveSuccess = (success) => {
    if (success) {
      // Do something in response to successful save
      console.log("Student data saved successfully");
      setShowModalLogin(false); // Close the modal
      fetchData();
    }
  };

  return (
    <>
      <div className=" w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Teacher List
              </blockquote>
            </div>
            <div>
              <div className=" w-full p-4  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                        <div className="py-3 px-4">
                          <div className="relative max-w-xs">
                            <label for="hs-table-search" class="sr-only">
                              Search
                            </label>
                            <input
                              type="text"
                              name="hs-table-search"
                              id="hs-table-search"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                              placeholder="Search for items"
                            />
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                              <svg
                                class="h-4 w-4 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="overflow-hidden">
                          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-700">
                              <tr>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Teacher ID
                                </th>

                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Name
                                </th>

                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Gender
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Date of Birth
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Email{" "}
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Address
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Phone
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Assigned Subject
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                              {filteredData != null ? (
                                filteredData?.map((item, index) => (
                                  <tr key={index}>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.teacherId}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.teacherName}
                                    </td>

                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.teacherGender}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.teacherDob
                                        ? `${new Date(
                                            item.teacherDob
                                          ).getFullYear()}-${
                                            new Date(
                                              item.teacherDob
                                            ).getMonth() + 1
                                          }-${new Date(
                                            item.teacherDob
                                          ).getDate()}`
                                        : "-"}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.teacherEmail}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.teacherAddress}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.teacherPhone}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      <ul className="list-disc list-inside">
                                        {item.assignedSubject.map(
                                          (subject, index) => (
                                            <li key={index}>{subject}</li>
                                          )
                                        )}
                                      </ul>
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-end text-sm font-medium">
                                      <button
                                        type="button"
                                        onClick={() => handleModify(item)}
                                        className="text-gray-900 bg-white border
                                        border-gray-300 focus:outline-none
                                        hover:bg-gray-100 focus:ring-4
                                        focus:ring-gray-200 font-medium
                                        rounded-lg text-sm px-2 py-1 me-2 mb-2
                                        dark:bg-gray-800 dark:text-white
                                        dark:border-gray-600
                                        dark:hover:bg-gray-700
                                        dark:hover:border-gray-600
                                        dark:focus:ring-gray-700">
                                        Modify
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemove(item.teacherEmail)
                                        }
                                        className="text-white bg-red-500 border border-gray-300 focus:outline-none hover:bg-red-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        Remove
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleLoginGeneration(item)
                                        }
                                        className="text-white bg-green-600 border border-gray-300 focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                        Credential
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <div>No data available</div>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModifyTeacher
          isModalOpen={showModal}
          closeModal={() => setShowModal(false)}
          user={selectedTeacher}
          onSaveSuccess={handleSaveSuccess}
        />
        <TeacherCred
          isModalOpen={showModalLogin}
          closeModal={() => setShowModalLogin(false)}
          user={selectedTeacher}
          onSaveSuccess={handleLoginSaveSuccess}
        />
      </div>
    </>
  );
}

export default TeacherList;
