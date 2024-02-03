/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import SubjectList from "../schema/subjectListSchema";
import { generateId } from "@/utlis/generateID";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.send(res, 405, { error: "Method Not Allowed" });
  }
  const { schoolCode, subjectName, courseType, subjectSemester, subjectCode } =
    req.body;
  const subjectId = generateId();
  try {
    // Create a new Product document based on the Product model
    const subject = new SubjectList({
      schoolCode: schoolCode,
      subjectId: subjectId,
      courseName: courseType,
      subjectName: subjectName,
      subjectSemester: subjectSemester,
      subjectCode: subjectCode,
    });

    // Save the product to the database
    await subject.save();

    res.status(201).json({ message: "Subject added successfully!" });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
