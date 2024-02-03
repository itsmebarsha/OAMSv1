/** @format */

import Credential from "../schema/credentialSchema";
import bcrypt from "bcrypt";
import newUser from "../schema/userSchema";
import { connectDB } from "@/utlis/database/Mongodb";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { schoolCode, name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Await the hashing operation

  try {
    // Save the plaintext password to the Credential schema
    const existingUser = await Credential.findOne({
      userEmail: email,
      schoolCode: schoolCode,
    });

    if (existingUser) {
      existingUser.userPassword = password;
      await existingUser.save();
    } else {
      const newCredential = new Credential({
        schoolCode: schoolCode,
        userName: name,
        userEmail: email,
        userPassword: password,
        userRole: role,
      });

      await newCredential.save();
    }
    const schoolName = await newUser.findOne({
      schoolCode: schoolCode,
    });

    // Save the hashed (encrypted) password to the Users schema
    const existingUserInUsers = await newUser.findOne({
      email: email,
      schoolCode: schoolCode,
    });

    if (existingUserInUsers) {
      existingUserInUsers.password = hashedPassword;
      await existingUserInUsers.save();
    } else {
      const newUsers = new newUser({
        schoolCode: schoolCode,
        schoolName: schoolName.schoolName,
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
      });

      await newUsers.save();
    }

    return res.status(201).json({ message: "User saved successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user." });
  }
}
