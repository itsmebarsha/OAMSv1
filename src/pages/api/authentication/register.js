/** @format */

// pages/api/register.js
import { connectDB } from "@/utlis/database/Mongodb";
import newUser from "../schema/userSchema";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, schoolName, password, role } = req.body;

  // Connect to MongoDB
  await connectDB();

  try {
    // Check if user with the same email already exists
    const existingUser = await newUser.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const prefix = "SCH"; // You can customize the prefix
    const latestUser = await newUser.findOne().sort({ schoolCode: -1 });
    let schoolCode = prefix + "001"; // Default starting value
    if (latestUser) {
      // Extract the numeric part and increment
      const numericPart = parseInt(
        latestUser.schoolCode.slice(prefix.length),
        10
      );
      schoolCode = prefix + ("000" + (numericPart + 1)).slice(-3); // Pad with leading zeros
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsers = new newUser({
      name: name,
      email: email,
      schoolName: schoolName,
      schoolCode: schoolCode,
      password: hashedPassword,
      role,
    });

    await newUsers.save();

    return res
      .status(201)
      .json({
        message: "User registered successfully.",
        schoolCode: schoolCode,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user." });
  }
}
