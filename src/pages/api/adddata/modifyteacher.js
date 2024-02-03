/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import Teachers from "../schema/teachersSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    schoolCode,

    teacherName,
    gender,
    dob,
    email,
    address,
    phone,
    assignedSubject,
  } = req.body;

  console.log(teacherName);

  try {
    // Find the teacher by their teacherId
    const updatedTeacher = await Teachers.findOneAndUpdate(
      { teacherEmail: email, schoolCode: schoolCode },
      {
        teacherName: teacherName,
        teacherGender: gender,
        teacherDob: dob,

        teacherAddress: address,
        teacherPhone: phone,
        assignedSubject: assignedSubject,
      },
      { new: true } // Return the updated teacher document
    );

    if (!updatedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher updated successfully!" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
