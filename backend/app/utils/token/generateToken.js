import jwt from "jsonwebtoken";
import fs from "fs";
import yaml from "js-yaml";

const loadConfig = () => {
  try {
    const config = yaml.load(fs.readFileSync("config/database.yaml", "utf8"));
    return config;
  } catch (error) {
    console.error(`Error reading database config: ${error.message}`);
    process.exit(1);
  }
};

const generateToken = (res, userId) => {
  const config = loadConfig();

  const token = jwt.sign({ userId }, config.jwt_secret, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
