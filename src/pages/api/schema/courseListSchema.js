/** @format */

import mongoose from "mongoose";
const courseSchemas = new mongoose.Schema({
  schoolCode: { type: String, required: true },

  courseId: {
    type: String,
  },
  courseName: {
    type: String,
  },
  courseSemester: {
    type: Number,
  },
  courseCode: {
    type: String,
  },
});

const CourseList =
  mongoose.models.CourseList || mongoose.model("CourseList", courseSchemas);

module.exports = CourseList;
