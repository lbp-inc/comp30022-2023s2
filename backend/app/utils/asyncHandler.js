import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import fs from "fs";
import yaml from "js-yaml";

// 读取配置文件
const loadConfig = () => {
  try {
    const config = yaml.load(fs.readFileSync("config/database.yaml", "utf8"));
    return config;
  } catch (error) {
    console.error(`Error reading database config: ${error.message}`);
    process.exit(1);
  }
};

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    // 加载配置文件
    const config = loadConfig();

    try {
      const decoded = jwt.verify(token, config.jwt_secret);

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
