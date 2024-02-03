/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Teachers from "../schema/teachersSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { email, schoolCode } = req.query; // Assuming the ID is passed as a query parameter

  try {
    // Find the teacher by their teacherId and remove them
    const removedTeacher = await Teachers.findOneAndRemove({
      teacherEmail: email,
      schoolCode: schoolCode,
    });

    if (!removedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher removed successfully!" });
  } catch (error) {
    console.error("Error removing teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
