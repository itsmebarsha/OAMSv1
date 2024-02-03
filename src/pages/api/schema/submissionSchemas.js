/** @format */

// models/Assignment.js

import mongoose from "mongoose";

const submissionSchemas = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  assignmentId: { type: Number },
  title: { type: String },
  semester: { type: String },
  subject: { type: String },
  studentName: { type: String },
  studentEmail: { type: String },
  teacherEmail: { type: String },
  submissionDate: { type: Date, default: Date.now() },
  submissionFile: { type: String },
  studentScore: { type: String },
  studentRemarks: { type: String },
});

//mongoose.deleteModel("SubmissionAssignment");
const Submissions =
  mongoose.models.SubmissionAssignment ||
  mongoose.model("SubmissionAssignment", submissionSchemas);

module.exports = Submissions;
