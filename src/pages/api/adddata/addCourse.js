/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import CourseList from "../schema/courseListSchema";
import { generateId } from "@/utlis/generateID";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.send(res, 405, { error: "Method Not Allowed" });
  }
  const { schoolCode, courseName, courseCode } = req.body;
  const courseId = generateId();
  try {
    // Create a new Product document based on the Product model
    const course = new CourseList({
      schoolCode: schoolCode,
      courseId: courseId,
      courseName: courseName,
      courseCode: courseCode,
    });

    // Save the product to the database
    await course.save();

    res.status(201).json({ message: "Course added successfully!" });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
