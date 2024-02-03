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
    id,
    email,
    address,
    phone,
    assignedSubject,
  } = req.body;

  try {
    // Check if the email already exists
    const existingTeacher = await Teachers.findOne({
      teacherEmail: email,
      schoolCode: schoolCode,
    });

    if (existingTeacher) {
      // If email exists, return an error response
      return res.status(400).json({ error: "Email already exists!" });
    }

    console.log(assignedSubject);
    // If email doesn't exist, register the new teacher
    const newTeacher = new Teachers({
      schoolCode: schoolCode,
      teacherName: teacherName,
      teacherGender: gender,
      teacherDob: dob,
      teacherId: id,
      teacherEmail: email,
      teacherAddress: address,
      teacherPhone: phone,
      assignedSubject: assignedSubject,
    });

    // Save the teacher to the database
    await newTeacher.save();

    res.status(201).json({ message: "Teacher added successfully!" });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
