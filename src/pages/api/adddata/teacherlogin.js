import { connectDB } from "@/utlis/database/Mongodb";
import Teacherlogin from "../schema/teacherloginSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log(teacherName);

  try {
    // Find the student by their teacher]]]]]]]]]]]]]]Id
    const loginTeacher = await Teacher.findOneAndUpdate(
      { teacherId: id },
      {
        teacherEmail: email,
        teacherPassword: password,
      },
      { new: true } // Return the updated teacher document
    );
    if (!loginTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ message: "Teacher login saved successfully!" });
  } catch (error) {
    console.error("Cannot save teacher login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
