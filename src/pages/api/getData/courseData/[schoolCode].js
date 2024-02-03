/** @format */

import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import CourseList from "../../schema/courseListSchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.send(res, 405, { error: "Method Not Allowed" });
  }
  const { schoolCode } = req.query; // Get the semester from the query parameters

  if (!schoolCode) {
    return res.status(400).json({ error: "School Coode is required" });
  }

  try {
    await connectDB();
    const data = await CourseList.find({ schoolCode: schoolCode });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
}
