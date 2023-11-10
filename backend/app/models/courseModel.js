// app/models/courseModel.js

import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      unique: true,
    },
    user_list: [String],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
