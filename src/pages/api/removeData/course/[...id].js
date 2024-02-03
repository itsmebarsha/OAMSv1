/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb";
import CourseList from "../../schema/courseListSchema";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query; // Get the course ID from the query parameters

      if (!id) {
        return res.status(400).json({ error: "Course ID is required" });
      }

      await connectDB(); // Connect to the database
      const deletedcourse = await CourseList.findOneAndDelete({
        courseId: id[0],
        schoolCode: id[1],
      });

      if (!deletedcourse) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
