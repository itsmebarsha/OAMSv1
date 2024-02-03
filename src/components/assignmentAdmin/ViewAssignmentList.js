/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ViewAssignmentList() {
  const schoolStore = userStore();
  const [assignments, setAssignments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const schoolCode = schoolStore.userData.schoolCode;
  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await axios.get(
          `/api/admin/viewAssignment/${schoolCode}`
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    }

    fetchAssignments();
  }, []);

  const filteredData = assignments.filter((item) =>
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (id) => {
    if (selectedFile) {
      // Create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append("schoolCode", schoolStore.userData.schoolCode);
      formData.append("id", id);
      formData.append("teacher", schoolStore.userData.userEmail);
      formData.append("assignmentSolution", selectedFile);

      try {
        // Make the POST request using Axios
        const response = await axios.post(
          "/api/admin/updateAssignment",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        alert("Assignment submitted successfully");
        // Do something with the response data or show a success message
      } catch (error) {
        console.error("API Error:", error.message);
        alert("Failed to submit assignment");
        // Show an error message or take appropriate action
      }
    } else {
      console.warn("No file selected");
    }
  };

  console.log(assignments);
  return (
    <>
      <div className=" w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Assignment List
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
                                  Assignment Date
                                </th>

                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Title
                                </th>

                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Semester
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Subject
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Details
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Deadline
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Grading
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Solution
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  File{" "}
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                              {filteredData != null ? (
                                filteredData?.map((item, index) => (
                                  <tr key={index}>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.assignmentDate
                                        ? `${new Date(
                                            item.assignmentDate
                                          ).getFullYear()}-${
                                            new Date(
                                              item.assignmentDate
                                            ).getMonth() + 1
                                          }-${new Date(
                                            item.assignmentDate
                                          ).getDate()}`
                                        : "-"}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.title}
                                    </td>

                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.semester}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.subject}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.assignmentDetails}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.assignmentDeadline
                                        ? `${new Date(
                                            item.assignmentDeadline
                                          ).getFullYear()}-${
                                            new Date(
                                              item.assignmentDeadline
                                            ).getMonth() + 1
                                          }-${new Date(
                                            item.assignmentDeadline
                                          ).getDate()}`
                                        : "-"}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      <ul>
                                        <li>PM: {item.passMark}</li>
                                        <li>FM: {item.fullMark}</li>
                                      </ul>
                                    </td>
                                    <td>
                                      {item.assignmentSolution && (
                                        <ul>
                                          <li className="py-2">
                                            {" "}
                                            <a
                                              href={item.assignmentFile}
                                              download>
                                              Solution
                                            </a>
                                          </li>
                                        </ul>
                                      )}
                                      <input
                                        type="file"
                                        name="assignmentSolution"
                                        id="assignmentSolution"
                                        onChange={handleFileChange}
                                      />
                                      <button
                                        onClick={() =>
                                          handleFileUpload(item.assignmentId)
                                        }>
                                        Upload
                                      </button>
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      <a href={item.assignmentFile} download>
                                        Download
                                      </a>
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
      </div>
    </>
  );
}

export default ViewAssignmentList;
