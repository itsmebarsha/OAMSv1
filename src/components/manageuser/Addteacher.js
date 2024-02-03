/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ZodError, z } from "zod";
import MultipleSelect from "@/utlis/MUltipleSelect";
import { userStore } from "@/utlis/Store";

const teacherSchema = z.object({
  schoolCode: z.string().min(1),
  teacherName: z.string().min(1),
  gender: z.string().min(1),
  dob: z.string().min(1),
  id: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  phone: z.string().min(1),
  assignedSubject: z.array(z.string()),
});
function Addteacher() {
  const schoolStore = userStore();
  const [teacherName, setTeacherName] = useState("");
  const [teacherGender, setTeacherGender] = useState("");
  const [teacherDob, setTeacherDob] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherAddress, setTeacherAddress] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [assignSubject, setAssignSubject] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const schoolCode = schoolStore.userData.schoolCode;
  useEffect(() => {
    async function fetchLastGeneratedID() {
      try {
        const response = await axios.get(
          `/api/getLastGeneratedID/teacher/${schoolCode}`
        );
        const lastID = response.data.lastEnteredId;

        // Generate a new four-digit ID based on the last ID
        const generatedId = (lastID + 1).toString().padStart(4, "0");
        setTeacherId(generatedId);
      } catch (error) {
        // If there are no users, start with ID 0001
        setTeacherId("0001");
      }
    }

    fetchLastGeneratedID();
  }, []);

  console.log("assign", assignSubject);
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate form data using the Zod schema
    try {
      const formData = teacherSchema.parse({
        schoolCode: schoolCode,
        teacherName,
        gender: teacherGender,
        dob: teacherDob,
        id: teacherId,
        email: teacherEmail,
        address: teacherAddress,
        phone: teacherPhone,
        assignedSubject: assignSubject,
      });

      // Make the POST request using Axios
      const response = await axios.post("/api/adddata/addTeacher", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the API response here if needed
      console.log("API Response:", response.data);
      alert("Teacher saved successfully");

      // Reset form fields after successful save
      setTeacherName("");
      setTeacherGender("");
      setTeacherDob("");
      setTeacherEmail("");
      setTeacherAddress("");
      setTeacherPhone("");
      setAssignSubject([]);
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle validation errors
        console.error("Validation Error:", error.errors);
        alert("Validation Error. Please check your form data.");
      } else {
        // Handle other errors
        console.error("API Error:", error.message);
        alert("Failed to save teacher");
      }
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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="col-span-3 lg:col-span-2">
          <div className=" p-6">
            <div className="text-2xl font-bold mb-10">
              <blockquote class="relative border-blue-700 border-s-4 ps-4 sm:ps-6 dark:border-gray-700">
                Add New Teacher
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
                    value={teacherId}
                    readOnly
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTeacherName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gender *
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTeacherGender(e.target.value)}
                    required
                    value={teacherGender}>
                    <option value="">Please Select Gender *</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Others</option>
                  </select>
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date Of Birth *
                  </label>
                  <input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 air-datepicker"
                    onChange={(e) => setTeacherDob(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-span-3 lg:col-span-1">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    placeholder=""
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setTeacherEmail(e.target.value)}
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
                    onChange={(e) => setTeacherAddress(e.target.value)}
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
    </>
  );
}

export default Addteacher;
