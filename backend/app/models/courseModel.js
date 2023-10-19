// app/models/courseModel.js

import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    time: Date,
    duration: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    cost: Number,
    users: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
