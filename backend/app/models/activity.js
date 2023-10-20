// app/models/activityModel.js

import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    activity_type: {
      type: String,
      required: true
    },
      labels: [String],
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

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
