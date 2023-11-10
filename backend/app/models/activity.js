import mongoose from "mongoose";

// This describes an activity (can be course or event)
const activitySchema = mongoose.Schema(
  {
      // Title of activity
    name: {
      type: String,
      required: true
    },

      // A short description, will be shown in "all activities" page
      subtitle: {
        type: String,
          required: true
      },

      // Possible values: { course | event }
    activity_type: {
      type: String,
      required: true
    },

      // Category labels, used for filtering
      labels: [String],

      // A resource URI pointing to an image
    image: {
      type: String,
    },

      // A longer description, will be shown in details page
    description: {
      type: String,
    },

      // Time and duration of the activity
    time: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },

      // Location of the activity
    location: {
      type: String,
      required: true
    },

      // Cost of the activity, default to be 0 for free activity
    cost: Number,

      // Max capacity of an activity, default to be no limit
    max_capacity: Number,

      // List of bookings, used to calculate availability
    bookings: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
