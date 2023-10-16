// app/models/messageModel.js

import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    group_list: {
      type: [String],
      required: true,
    },
    user_list: {
      type: [
        {
          username: String,
          email: String,
          isRead: { type: Boolean, default: false },
        },
      ],
      required: true,
    },
    isEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
