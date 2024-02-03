/** @format */

import mongoose from "mongoose";
const subjectSchemas = new mongoose.Schema({
  schoolCode: { type: String, required: true },
  subjectId: {
    type: String,
  },
  courseName: {
    type: String,
  },
  subjectName: {
    type: String,
  },

  subjectSemester: {
    type: Number,
  },
  subjectCode: {
    type: String,
  },
});

const SubjectList =
  mongoose.models.SubjectList || mongoose.model("SubjectList", subjectSchemas);

module.exports = SubjectList;
