/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import AssignmentAssign from "../../schema/assignmentAssignSchema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { semester } = req.query; // Get the semester from the query parameters

      if (!semester) {
        return res.status(400).json({ error: "Semester is required" });
      }

      await connectDB(); // Connect to the database
      const assignments = await AssignmentAssign.find({
        schoolCode: semester[1],
        semester: semester[0],
      });

      res.status(200).json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
