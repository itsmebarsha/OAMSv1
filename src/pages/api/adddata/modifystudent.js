/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Student from "../schema/studentSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id, schoolCode, studentName, semester, email, address, phone } =
    req.body;
  console.log(studentName);

  try {
    // Find the student by their studentId
    const updatedStudent = await Student.findOneAndUpdate(
      { studentEmail: email, schoolCode: schoolCode },
      {
        studentName: studentName,
        studentSemester: semester,

        studentAddress: address,
        studentPhone: phone,
      },
      { new: true } // Return the updated student document
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully!" });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
