/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Student from "../schema/studentSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { schoolCode, studentName, semester, id, email, address, phone } =
    req.body;

  try {
    // Check if the email already exists
    const existingStudent = await Student.findOne({
      studentEmail: email,
      schoolCode: schoolCode,
    });

    if (existingStudent) {
      // If email exists, return an error response
      return res.status(400).json({ error: "Email already exists!" });
    }

    // If email doesn't exist, register the new student
    const newStudent = new Student({
      schoolCode: schoolCode,
      studentName: studentName,
      studentSemester: semester,
      studentId: id,
      studentEmail: email,
      studentAddress: address,
      studentPhone: phone,
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
