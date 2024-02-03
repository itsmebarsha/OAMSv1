/** @format */

// pages/api/update.js
import { connectDB } from "@/utlis/database/Mongodb";
import newUser from "../schema/userSchema";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, schoolCode, email, password, role } = req.body;

  // Connect to MongoDB
  await connectDB();

  try {
    // Check if user with the same email already exists
    const existingUser = await newUser.findOne({
      email: email,
      schoolCode: schoolCode,
    });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email doesnot exists." });
    }

    // Hash the password before saving to the database

    existingUser.password = hashedPassword;
    await existingUser.save();

    return res.status(201).json({ message: "User saved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user." });
  }
}
