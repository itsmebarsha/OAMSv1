/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
import CourseList from "../../schema/courseListSchema";
import newUser from "../../schema/userSchema";
import Student from "../../schema/studentSchema";
import SubjectList from "../../schema/subjectListSchema";
import Teachers from "../../schema/teachersSchema";
import AssignmentAssign from "../../schema/assignmentAssignSchema";
import Submissions from "../../schema/submissionSchemas";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { schoolCode, studentEmail } = req.query;

  if (!schoolCode) {
    return res.status(400).json({ error: "School Code is required" });
  }

  try {
    await connectDB();

    const userCount = await newUser.countDocuments({ schoolCode: schoolCode });
    const studentCount = await Student.countDocuments({
      schoolCode: schoolCode,
    });
    const teacherCount = await Teachers.countDocuments({
      schoolCode: schoolCode,
    });
    const courseCount = await CourseList.countDocuments({
      schoolCode: schoolCode,
    });
    const subjectCount = await SubjectList.countDocuments({
      schoolCode: schoolCode,
    });
    const assignmentCount = await AssignmentAssign.countDocuments({
      schoolCode: schoolCode,
    });
    const submissionCount = await Submissions.countDocuments({
      schoolCode: schoolCode,
    });

    const data = {
      userCount,
      studentCount,
      teacherCount,
      courseCount,
      subjectCount,
      assignmentCount,
      submissionCount,
    };

    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
}
