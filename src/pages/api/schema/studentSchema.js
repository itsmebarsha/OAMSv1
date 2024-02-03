/** @format */

import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  studentName: {
    type: String,
  },
  studentSemester: {
    type: Number,
  },
  studentId: {
    type: Number,
  },
  studentEmail: {
    type: String,
    unique: true,
  },
  studentAddress: {
    type: String,
  },
  studentPhone: {
    type: Number,
  },
});

const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);

module.exports = Student;
