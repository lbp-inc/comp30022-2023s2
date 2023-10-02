import mongoose from "mongoose";

const userInfoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    birthday: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique:true,
    },
    phone:{
        type: String,
        require: true,
    },
    username: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);


const UserInfo = mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;