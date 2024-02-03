/** @format */

import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import AssignmentAssign from "../../schema/assignmentAssignSchema";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const { schoolCode } = req.query; // Get the semester from the query parameters

  if (!schoolCode) {
    return res.status(400).json({ error: "School Coode is required" });
  }
  try {
    await connectDB();
    const data = await AssignmentAssign.find({ schoolCode: schoolCode })
      .sort({ _id: -1 })
      .limit(1); // Sort by _id in descending order to get the latest entry
    const lastEnteredId = data.length > 0 ? data[0].assignmentId : null;
    res.status(200).json({ lastEnteredId });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
}
