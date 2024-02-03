import { connectDB } from "@/utlis/database/Mongodb";
import Studentlogin from "../schema/studentloginSchema";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log(studentName);

  try {
    // Find the student by their studentId
    const loginStudent = await Student.findOneAndUpdate(
        { studentId: id },
        
      {
        studentEmail: email,
        studentPassword: password,
      },
      { new: true } // Return the updated student document
    );

    if (!loginStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student login saved successfully!" });
  } catch (error) {
    console.error("Cannot save student login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
