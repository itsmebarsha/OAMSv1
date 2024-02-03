/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useState, useEffect } from "react";

function SubmitAssignment() {
  const schoolStore = userStore();
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [teachrEmail, setTeacherEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);
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
      console.log("Dat" + response.data);
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
      console.log("hey" + users?.user?.studentSemester);
      fetchAssignments(users.user.studentSemester);
    }
  }, [users]); // Fetch assignments when the user data changes

  console.log("dff", assignments);

  const handleAssignmentChange = (event) => {
    const selectedTitle = event.target.value;
    setTitle(selectedTitle);

    // Find the selected assignment based on the title
    const selectedAssignment = assignments.find(
      (assignment) => assignment.title === selectedTitle
    );

    // Extract subject and teacher from the selected assignment
    if (selectedAssignment) {
      setSubject(selectedAssignment.subject);
      setTeacherEmail(selectedAssignment.teacher);
    } else {
      // Handle the case where the selected assignment is not found
      setSubject("");
      setTeacherEmail("");
    }
  };

  useEffect(() => {
    async function fetchLastGeneratedID() {
      try {
        const response = await axios.get(
          `/api/getLastGeneratedID/submission/${schoolCode}`
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

    formData.append("semester", users?.user?.studentSemester);
    formData.append("subject", subject);
    formData.append("studentName", users?.user?.studentName);
    formData.append("studentEmail", users?.user?.studentEmail);
    formData.append("teacherEmail", teachrEmail);
    formData.append("postAssignment", selectedFile);

    try {
      // Make the POST request using Axios
      const response = await axios.post(
        "/api/student/submitAssignment",
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
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-3 lg:col-span-2">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Submit Assignment
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
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Assignment title
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={handleAssignmentChange}>
                    <option value="">Select an assignment</option>
                    {assignments.map((assignment, index) => (
                      <option key={index} value={assignment.title}>
                        {assignment.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Semester
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={users?.user?.studentSemester} // Set the value of the input to the generated ID
                    readOnly // Make the input read-only
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Student Name:
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={users?.user?.studentName} // Set the value of the input to the generated ID
                    readOnly // Make the input read-only
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {" "}
                    Upload Assignment Solution (.pdf,.doc,.docx,.jpeg,.xls)
                  </label>
                  <br />
                  <input
                    type="file"
                    id="postAssignment"
                    name="postAssignment"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    accept=".pdf,.doc,.docx,.jpeg,.xls"
                    required
                    onChange={handleFileChange}
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

export default SubmitAssignment;
