/** @format */

// models/Assignment.js

import mongoose from "mongoose";

const assignmentAssignSchema = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  assignmentId: { type: Number },
  title: {
    type: String,
    unique: true,
  },
  semester: { type: String },
  course: { type: String },
  subject: { type: String },
  assignmentDetails: { type: String },
  assignmentDate: { type: Date, default: Date.now() },
  assignmentFile: { type: String },
  teacher: { type: String },
  assignmentSolution: { type: String },
  assignmentDeadline: { type: Date },
  passMark: { type: String },
  fullMark: { type: String },
});
mongoose.deleteModel("AssignmentAssign");
const AssignmentAssign =
  mongoose.models.Assignments ||
  mongoose.model("AssignmentAssign", assignmentAssignSchema);

module.exports = AssignmentAssign;
