/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
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

    // Step 1: Fetch teachers' information (name, assigned subjects)
    const teachersInfo = await Teachers.find({ schoolCode: schoolCode });

    // Step 2: For each teacher, fetch the count of total assignments given
    const teachersWithAssignmentCount = await Promise.all(
      teachersInfo.map(async (teacher) => {
        const assignmentCount = await AssignmentAssign.countDocuments({
          schoolCode: schoolCode,
          teacher: teacher.teacherEmail,
        });
        const submissionCount = await Submissions.countDocuments({
          schoolCode: schoolCode,
          teacherEmail: teacher.teacherEmail,
        });

        const scoredCount = await Submissions.countDocuments({
          schoolCode: schoolCode,
          teacherEmail: teacher.teacherEmail,
          studentScore: { $ne: "" }, // Count only documents where studentScore is not empty
        });

        return {
          name: teacher.teacherName,
          assignedSubjects: teacher.assignedSubject,
          assignmentCount,
          submissionCount,
          scoredCount,
        };
      })
    );

    // Combine the information
    const data = {
      teachersWithAssignmentCount,
    };
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data from MongoDB" });
  }
}
