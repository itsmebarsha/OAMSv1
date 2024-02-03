/** @format */

import { connectDB } from "@/utlis/database/Mongodb";
//import Registration from "@/pages/registration/Registration";
import Registration from "../schema/assignmentSchemas";
connectDB();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.send(res, 405, { error: "Method Not Allowed" });
  }

  const { fullname, email, phone, password } = req.body;
  try {
    // Create a new Product document based on the Product model
    const newRegistration = new Registration({
      name: fullname,
      studentSemester: semester,
      email: email,
      phone: phone,
      password: password,
    });

    // Save the product to the database
    await newRegistration.save();

    res.status(201).json({ message: "Registration successfull!" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
