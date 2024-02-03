/** @format */
import mongoose from "mongoose";
const userSchemas = new mongoose.Schema({
  name: { type: String, required: true },
  schoolName: { type: String, required: true },
  schoolCode: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  token: { type: String },
});

const newUser =
  mongoose.models.newUser || mongoose.model("newUser", userSchemas);

module.exports = newUser;
