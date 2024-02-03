/** @format */

// Import necessary modules and initialize Express
import { connectDB } from "@/utlis/database/Mongodb"; // Fix typo in the import path
import Submissions from "../schema/submissionSchemas";
import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory (you can change this to disk storage if needed)
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false, // Disabling the built-in bodyParser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB(); // Connect to the database

      // Use multer to handle multipart form data
      upload.none()(req, res, async function (err) {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).json({ error: "Failed to upload file" });
        }

        const { schoolCode, id, email, score, remarks } = req.body;

        console.log(schoolCode);

        const user = await Submissions.findOneAndUpdate(
          {
            schoolCode: schoolCode,
            assignmentId: id,
            studentEmail: email,
          },
          {
            studentScore: score,
            studentRemarks: remarks,
          },
          { new: true }
        );

        if (!user) {
          return res.status(404).json({ error: "Submission not found" });
        }

        res.status(200).json({ message: "Score updated successfully!" });
      });
    } catch (error) {
      console.error("Error fetching submission:", error);
      res.status(500).json({ error: "Failed to fetch submission" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
