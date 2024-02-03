/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import AssignmentAssign from "../../schema/assignmentAssignSchema";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { schoolCode, subjects } = req.query;

      if (!schoolCode) {
        return res.status(400).json({ error: "School Code is required" });
      }

      await connectDB(); // Connect to the database

      // Convert subjects string to an array
      const assignedSubjects = subjects ? subjects.split(",") : [];
      console.log(assignedSubjects);
      const assignments = await AssignmentAssign.find({
        schoolCode: schoolCode[1],
        teacher: schoolCode[0],
        // subject: { $in: assignedSubjects },
      });

      console.log(assignments);
      res.status(200).json(assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
