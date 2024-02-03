/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import Submissions from "../../schema/submissionSchemas";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { email } = req.query; // Get the semester from the query parameters

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      await connectDB(); // Connect to the database
      const submission = await Submissions.find({
        schoolCode: email[1],
        studentEmail: email[0],
      });
      res.status(200).json(submission);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      res.status(500).json({ error: "Failed to fetch assignments" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
