/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Student from "./schema/studentSchema";
import Teachers from "./schema/teachersSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { email, role } = req.query;

  if (role === "student") {
    try {
      // Find the student by their email
      const foundStudent = await Student.findOne({ studentEmail: email });

      if (!foundStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Student found, return the user
      return res.status(200).json({ user: foundStudent });
    } catch (error) {
      console.error("Error finding student:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (role === "teacher") {
    try {
      // Find the student by their email
      const foundTeacher = await Teachers.findOne({ teacherEmail: email });

      if (!foundTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      // Student found, return the user
      return res.status(200).json({ user: foundTeacher });
    } catch (error) {
      console.error("Error finding student:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
  }
}
