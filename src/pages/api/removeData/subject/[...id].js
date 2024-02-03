/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb";
import SubjectList from "../../schema/subjectListSchema";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query; // Get the subject ID from the query parameters

      if (!id) {
        return res.status(400).json({ error: "Subject ID is required" });
      }

      await connectDB(); // Connect to the database
      const deletedSubject = await SubjectList.findOneAndDelete({
        subjectId: id[0],
        schoolCode: id[1],
      });

      if (!deletedSubject) {
        return res.status(404).json({ error: "Subject not found" });
      }

      res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.error("Error deleting subject:", error);
      res.status(500).json({ error: "Failed to delete subject" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
