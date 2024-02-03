/** @format */

// pages/api/addAssignment.js

import multer from "multer";
import path from "path"; // Import the path module
import { connectDB } from "@/utlis/database/Mongodb";
import AssignmentAssign from "../schema/assignmentAssignSchema";
// Utility function to connect to MongoDB
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/assignment/",
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
      await upload.fields([{ name: "assignment", maxCount: 1 }])(
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
            assignmentDetails,
            teacher,
            assignmentSolution,
            deadline,
            passMark,
            fullMark,
          } = req.body;

          const assignmentFile = req.files["assignment"][0];

          const assignment = new AssignmentAssign({
            schoolCode: schoolCode,
            assignmentId: id,
            title: title,
            semester: semester,
            assignmentDetails: assignmentDetails,
            assignmentFile: `/assignment/${assignmentFile.filename}`,
            teacher: teacher,
            assignmentSolution: assignmentSolution,
            subject: subject,
            assignmentDeadline: deadline,
            passMark: passMark,
            fullMark: fullMark,
          });

          await assignment.save();

          res.status(200).json({
            message: "Assignment saved successfully!",
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
