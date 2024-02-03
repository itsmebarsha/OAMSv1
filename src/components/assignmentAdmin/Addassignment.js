/** @format */

import { userStore } from "@/utlis/Store";

import axios from "axios";
import React, { useState, useEffect } from "react";

function Addassignment() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [passMark, setPassMark] = useState("");
  const [fullMark, setFullMark] = useState("");

  const [dataSubject, setDataSubject] = useState([]);
  const schoolStore = userStore();
  const schoolCode = schoolStore.userData.schoolCode;
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(
        `/api/getData/subjectData/${schoolCode}`
      );
      setDataSubject(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchSubjectData();
  }, []);

  useEffect(() => {
    async function fetchLastGeneratedID() {
      try {
        const response = await axios.get(
          `/api/getLastGeneratedID/assignment/${schoolCode}`
        );
        const lastID = response.data.lastEnteredId;

        // Generate a new four-digit ID based on the last ID
        const generatedId = (lastID + 1).toString().padStart(4, "0");
        setId(generatedId);
      } catch (error) {
        // If there are no users, start with ID 0001
        setId("0001");
      }
    }

    fetchLastGeneratedID();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send the file and other data
    const formData = new FormData();
    formData.append("schoolCode", schoolStore.userData.schoolCode);
    formData.append("id", id);
    formData.append("title", title);
    formData.append("semester", semester);
    formData.append("assignmentDetails", assignmentDetails);
    formData.append("assignmentSolution", "");
    formData.append("assignment", selectedFile);
    formData.append("teacher", schoolStore.userData.userEmail);
    formData.append("deadline", deadline);
    formData.append("passMark", passMark);
    formData.append("fullMark", fullMark);
    formData.append("subject", subject);

    try {
      // Make the POST request using Axios
      const response = await axios.post("/api/admin/addAssignment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);
      alert("Assignment submitted successfully");
      // Do something with the response data or show a success message
    } catch (error) {
      console.error("API Error:", error.message);
      alert("Failed to submit assignment");
      // Show an error message or take appropriate action
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
    const selectedSubject = dataSubject.find(
      (course) => course.subjectName === subject
    );

    if (selectedSubject) {
      setSemester(selectedSubject.subjectSemester);
    } else {
      setSemester([]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-3 lg:col-span-2">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Add New Assignment
              </blockquote>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Assignment Id
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={id} // Set the value of the input to the generated ID
                    readOnly // Make the input read-only
                  />
                </div>

                <div className="col-md-12 form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select subject *
                  </label>
                  <select
                    value={subject}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleSubject(e)}>
                    <option>Select Subject</option>
                    {dataSubject.map((course, index) => (
                      <option key={index} value={course.subjectName}>
                        {course.courseName}- {course.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Assign To
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    value={semester}
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Assigned by/Assignment Details:
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="message"
                    id="form-message"
                    rows="3"
                    onChange={(e) =>
                      setAssignmentDetails(e.target.value)
                    }></textarea>
                </div>

                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Upload Assignment Question(.pdf,.doc,.docx,.jpeg,.xls)
                  </label>
                  <br />
                  <input
                    type="file"
                    id="assignment"
                    name="assignment"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    accept=".pdf,.doc,.docx,.jpeg,.xls"
                    required
                    onChange={handleFileChange}></input>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="message"
                    id="form-message"
                    cols=""
                    rows="2"></textarea>
                </div>

                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Deadline
                  </label>
                  <input
                    type="date"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pass Mark
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="passMark"
                    value={passMark}
                    onChange={(e) => setPassMark(e.target.value)}
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Full Mark
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="fullMark"
                    value={fullMark}
                    onChange={(e) => setFullMark(e.target.value)}
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
    </>
  );
}

export default Addassignment;
