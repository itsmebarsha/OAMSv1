/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewSubmissionList() {
  const [searchTerm, setSearchTerm] = useState("");

  const schoolStore = userStore();
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [scoreValues, setScoreValues] = useState([]);
  const [remarksValues, setRemarksValues] = useState([]);
  const schoolCode = schoolStore.userData.schoolCode;
  async function fetchSubmissions() {
    try {
      const response = await axios.get(
        `/api/admin/viewSubmission/${schoolCode}`
      );
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  }
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const submitScore = async (item, index) => {
    if (scoreValues[index]) {
      // Create a FormData object to send the file and other data
      const formData = new FormData();
      formData.append("schoolCode", schoolStore.userData.schoolCode);
      formData.append("id", item.assignmentId);
      formData.append("email", item.studentEmail);

      // formData.append("submission", item.submissionFile);
      formData.append("score", scoreValues[index]);
      formData.append("remarks", remarksValues[index]);
      console.log("hello", formData);
      try {
        // Make the POST request using Axios
        const response = await axios.post(
          "/api/admin/updateEvaluation",
          formData
        );

        console.log("API Response:", response.data);
        alert("Score submitted successfully");
        fetchSubmissions();
        // Do something with the response data or show a success message
      } catch (error) {
        console.error("API Error:", error.message);

        // Show an error message or take appropriate action
      }
    } else {
      console.warn("No score added");
    }
  };

  const handleScoreChange = (index, value) => {
    const newScoreValues = [...scoreValues];
    newScoreValues[index] = value;
    setScoreValues(newScoreValues);
  };

  const handleRemarksChange = (index, value) => {
    const newRemarksValues = [...remarksValues];
    newRemarksValues[index] = value;
    setRemarksValues(newRemarksValues);
  };

  const filteredData = submissions.filter((item) =>
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

  return (
    <>
      <div className=" w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Submission List
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
                                  Assignment ID
                                </th>

                                <th
                                  scope="col"
                                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                                  Assignment Title
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
                                  Student
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  File
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Score{" "}
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Remarks
                                </th>
                                <th
                                  scope="col"
                                  class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                                  Submit
                                </th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                              {filteredData != null ? (
                                filteredData?.map((item, index) => (
                                  <tr key={index}>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                      {item.assignmentId}
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
                                      <ul>
                                        <li> {item.studentName}</li>
                                        <li> {item.studentEmail}</li>
                                      </ul>
                                    </td>

                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      <a href={item.assignmentFile} download>
                                        Download
                                      </a>
                                    </td>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.studentScore ? (
                                        <>
                                          <div>{item.studentScore}</div>
                                        </>
                                      ) : (
                                        <div>
                                          <input
                                            type="text"
                                            placeholder="Enter score"
                                            name="score"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={scoreValues[index] || ""}
                                            onChange={(e) =>
                                              handleScoreChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </td>

                                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {item.studentRemarks ? (
                                        <>
                                          <div>{item.studentRemarks}</div>
                                        </>
                                      ) : (
                                        <div>
                                          <textarea
                                            rows="2"
                                            placeholder="Enter remarks"
                                            value={remarksValues[index] || ""}
                                            onChange={(e) =>
                                              handleRemarksChange(
                                                index,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      )}
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {!item.studentRemarks &&
                                      !item.studentScore ? (
                                        <button
                                          onClick={() =>
                                            submitScore(item, index)
                                          }
                                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-2 py-1 text-xs me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                          Save
                                        </button>
                                      ) : (
                                        <div>
                                          <p>Scored</p>
                                        </div>
                                      )}
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

export default ViewSubmissionList;
