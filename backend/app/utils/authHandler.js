import UserModel from "../models/userModel.js";

// @desc   Middleware for Admin users
const admin = (req, res, next) => {
  next();
  // if (req.userModel) {
  //   next();
  // } else {
  //   throw new Error("test");
  // }
};

export { admin };
