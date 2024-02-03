/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { z } from "zod";
const subjectSchema = z.object({
  subjectName: z.string().min(1, "Subject Name cannot be empty"),
  courseType: z.string().min(1, "Course Type cannot be empty"),
  subjectSemester: z.string().min(1, "Subject Semester cannot be empty"),
  subjectCode: z.string().min(1, "Subject Code cannot be empty"),
});
function Addsubject() {
  const schoolStore = userStore();
  const [subjectName, setsubjectName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [subjectSemester, setsubjectSemester] = useState("");
  const [subjectCode, setsubjectCode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const schoolCode = schoolStore.userData.schoolCode;
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

  const handleDelete = async (subjectid) => {
    try {
      const response = await axios.delete(
        `/api/removeData/subject/${subjectid}/${schoolCode}`
      );
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`/api/getData/courseData/${schoolCode}`);
      setDataCourse(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
    fetchCourseData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      schoolCode: schoolStore.userData.schoolCode,
      subjectName: subjectName,
      courseType: courseType,
      subjectSemester: subjectSemester,
      subjectCode: subjectCode,
    };

    try {
      // Validate form data using Zod
      subjectSchema.parse(formData);

      // Make the POST request using Axios
      const response = await axios.post("/api/adddata/addSubject", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the API response here if needed
      console.log("API Response:", response.data);
      alert("Subject saved successfully");

      // Clear form fields upon successful submission
      setsubjectName("");
      setCourseType("");
      setsubjectSemester("");
      setsubjectCode("");

      // Fetch updated data
      fetchData();
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        console.error("Validation Error:", error.errors);
        alert("Please fill in all required fields.");
      } else {
        // Handle other errors
        console.error("API Error:", error.message);
        alert("Failed to save subject");
      }
    }
  };

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

  return (
    <div className="">
      {" "}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-3 lg:col-span-2">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Add New Subject
              </blockquote>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select course *
                  </label>
                  <select
                    value={courseType}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setCourseType(e.target.value)}>
                    <option>Select Course</option>
                    {dataCourse.map((course, index) => (
                      <option key={index} value={course.courseName}>
                        {course.courseName}- {course.courseCode}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select semester *
                  </label>
                  <select
                    value={subjectSemester}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setsubjectSemester(e.target.value)}>
                    <option>Select Semester</option>
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
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Subject Name *
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    value={subjectName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setsubjectName(e.target.value)}
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={subjectCode}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setsubjectCode(e.target.value)}
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
      <div className=" mt-4">
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
                            Course Name
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Subject Name
                          </th>

                          <th
                            scope="col"
                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                            Subject Semester
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                            Subject Code
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
                                {item.courseName}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                {item.subjectName}
                              </td>

                              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.subjectSemester}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {item.subjectCode}
                              </td>
                              <td class="px-4 py-2 whitespace-nowrap text-end text-sm font-medium">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item.subjectId)}
                                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                  Delete
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
  );
}

export default Addsubject;
