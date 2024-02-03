/** @format */

import { userStore } from "@/utlis/Store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { z } from "zod";

const studentSchema = z.object({
  schoolCode: z.string().min(1),
  studentName: z.string().min(1),
  semester: z.string().min(1),
  id: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  phone: z.string().min(1),
});
function AddStudent() {
  const schoolStore = userStore();
  const [studentName, setStudentName] = useState("");
  const [semester, setSemester] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const schoolCode = schoolStore.userData.schoolCode;
  useEffect(() => {
    async function fetchLastGeneratedID() {
      try {
        const response = await axios.get(
          `/api/getLastGeneratedID/student/${schoolCode}`
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

    // Validate form data using the Zod schema
    try {
      const formData = studentSchema.parse({
        schoolCode: schoolStore.userData.schoolCode,
        studentName: studentName,
        semester: semester,
        id: id,
        email: email,
        address: address,
        phone: phone,
      });

      // Make the POST request using Axios
      const response = await axios.post("/api/adddata/addStudent", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the API response here if needed
      console.log("API Response:", response.data);

      // Reset form fields after successful save
      setStudentName("");
      setSemester("");
      setAddress("");
      setPhone("");
      setEmail("");
      alert("Student saved successfully");
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        console.error("Validation Error:", error.errors);
        alert("Validation Error. Please check your form data.");
      } else {
        // Handle other errors
        console.error("API Error:", error.message);
        alert("Failed to save student");
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-3 lg:col-span-2">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Add New Student
              </blockquote>
            </div>
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
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Semester *
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
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

                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    required
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
    </>
  );
}

export default AddStudent;
