/** @format */

// models/Product.js
import mongoose from "mongoose";
const teacherSchemas = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  teacherName: {
    type: String,
  },
  teacherGender: {
    type: String,
  },

  teacherDob: {
    type: Date,
  },
  teacherId: {
    type: Number,
  },
  teacherEmail: {
    type: String,
    unique: true,
  },
  teacherAddress: {
    type: String,
  },
  teacherPhone: {
    type: Number,
  },
  assignedSubject: {
    type: [String],
  },
});

const Teachers =
  mongoose.models.Teachers || mongoose.model("Teachers", teacherSchemas);

module.exports = Teachers;
