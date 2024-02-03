/** @format */

// pages/api/addAssignment.js

import multer from "multer";
import path from "path";
import { connectDB } from "@/utlis/database/Mongodb";
import AssignmentAssign from "../schema/assignmentAssignSchema";

const upload = multer({
  storage: multer.diskStorage({
    destination: "public/assignment/solution/",
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}`;
      const extension = path.extname(file.originalname);
      const filename = `${file.fieldname}-${uniqueSuffix}${extension}`;
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
      await upload.fields([{ name: "solution", maxCount: 1 }])(
        req,
        res,
        async function (error) {
          if (error) {
            console.error("Error handling file uploads:", error);
            res.status(500).json({ message: "Error handling file uploads" });
            return;
          }

          await connectDB();
          const { schoolCode, id, teacher, assignmentSolution } = req.body;

          const assignmentFile = req.files["solution"][0];

          // Check if the assignment exists based on school code, assignment id, and teacher
          const existingAssignment = await AssignmentAssign.findOneAndUpdate(
            {
              schoolCode: schoolCode,
              assignmentId: id,
              teacher: teacher,
            },
            {
              assignmentSolution: `/assignment/solution/${assignmentFile.filename}`,
            },
            { new: true }
          );

          if (!existingAssignment) {
            return res.status(404).json({ error: "Assignment not found" });
          }

          res.status(200).json({ message: "Solution updated successfully!" });
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
