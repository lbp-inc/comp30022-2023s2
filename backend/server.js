import cors from "cors";
dotenv.config();
import connectDB from "./app/utils/database/db_connect.js";
import userRoutes from "./app/router/v1/index.js";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import yaml from "js-yaml";
import { notFound, errorHandler } from "./app/utils/errorHandler.js";
import roomHireRoutes from "./app/controllers/roomHireController.js";

const loadConfig = () => {
  try {
    const config = yaml.load(fs.readFileSync("config/database.yaml", "utf8"));
    return config;
  } catch (error) {
    console.error(`Error reading database config: ${error.message}`);
    process.exit(1);
  }
};

const port = process.env.PORT || loadConfig().port;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/roomHire", roomHireRoutes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")));
} else {
  app.get("/", (req, res) => res.send("Server is ready"));
}

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`)); // 使用从配置文件中读取的端口
