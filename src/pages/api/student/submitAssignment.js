/** @format */

// pages/api/postAssignment.js
import multer from "multer";
import path from "path"; // Import the path module
import { connectDB } from "@/utlis/database/Mongodb";

import Submissions from "../schema/submissionSchemas";
// Utility function to connect to MongoDB
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/assignment/submission/",
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}`;
      const extension = path.extname(file.originalname); // Get the file extension
      const filename = `${file.fieldname}-${uniqueSuffix}${extension}`; // Use the original extension
      cb(null, filename);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await upload.fields([{ name: "postAssignment", maxCount: 1 }])(
        req,
        res,
        async function (error) {
          if (error) {
            console.error("Error handling file uploads:", error);
            res.status(500).json({ message: "Error handling file uploads" });
            return;
          }
          await connectDB();
          const {
            schoolCode,
            id,
            title,
            semester,
            subject,
            studentName,
            studentEmail,
            teacherEmail,
          } = req.body;

          const postAssignmentFile = req.files["postAssignment"][0];

          const postAssignment = new Submissions({
            schoolCode: schoolCode,
            assignmentId: id,
            title: title,
            semester: semester,
            subject: subject,
            studentEmail: studentEmail,
            studentName: studentName,
            teacherEmail: teacherEmail,
            submissionFile: `/postAssignment/${postAssignmentFile.filename}`,
            studentScore: "",
            studentRemarks: "",
          });

          await postAssignment.save();

          res.status(200).json({
            message: "Assignment posted  successfully!",
          });
        }
      );
    } catch (error) {
      console.error("Error handling the API request:", error);
      res.status(500).json({ message: "Error handling the API request" });
    }
  } else {
    res.status(404).json({ message: "Not found" });
  }
}
