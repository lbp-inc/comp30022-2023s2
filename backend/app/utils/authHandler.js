import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "liTq9vasHanieW0Sb8ClegPSs6dZV05xHLKSiEZhPUC4KPSurj0pmJJs66L8biTNSvTxM11rUacxXX0P23clrB8vmC7i0e0RMVc";

// @desc   Middleware for Admin users
const admin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "User is not an admin" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { admin };
