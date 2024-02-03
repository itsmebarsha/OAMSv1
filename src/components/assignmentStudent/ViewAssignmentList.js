/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ViewAssignmentList() {
  const schoolStore = userStore();
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const schoolCode = schoolStore.userData.schoolCode;
  async function fetchUser() {
    try {
      const responseUser = await axios.get(
        `/api/getDetail?email=${schoolStore.userData.userEmail}&role=${schoolStore.userData.userRole}`
      );
      setUsers(responseUser.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function fetchAssignments(studentSemester) {
    try {
      const response = await axios.get(
        `/api/student/viewAssignment/${studentSemester}/${schoolCode}`
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []); // Fetch user data on component mount

  useEffect(() => {
    // Check if user data exists and contains studentSemester before fetching assignments
    if (users?.user?.studentSemester) {
      fetchAssignments(users.user.studentSemester);
    }
  }, [users]); // Fetch assignments when the user data changes

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

  console.log(assignments);
  return (
    <>
      <div className=" w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <div className=" p-6">
            <div className="text-base font-bold mb-10">
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
