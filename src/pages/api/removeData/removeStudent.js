/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Student from "../schema/studentSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { email, schoolCode } = req.query; // Assuming the ID is passed as a query parameter

  try {
    // Find the student by their studentId and remove them
    const removedStudent = await Student.findOneAndRemove({
      studentEmail: email,
      schoolCode: schoolCode,
    });

    if (!removedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student removed successfully!" });
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
