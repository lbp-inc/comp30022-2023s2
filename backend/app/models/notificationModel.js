import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isEmail: { type: Boolean, required: true, default: false },
    user_list: [
      {
        username: { type: String, required: true },
        email: { type: String, required: true },
        isRead: { type: Boolean, required: true, default: false },
      },
    ],
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
