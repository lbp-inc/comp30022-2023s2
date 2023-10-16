/**
 * Main server setup file for MERN stack application.
 */

/**
 * Importing required packages and modules.
 */
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

/**
 * Custom modules.
 */
import connectDB from "./app/utils/connectDB.js";
import userRoutes from "./app/router/index.js";
import { notFound, errorHandler } from "./app/utils/errorHandler.js";
import config from "./config/config.js";

// Loading environment variables.
dotenv.config();

// Setting up the port.
const port = process.env.PORT || config.port;

// Connecting to database.
connectDB();

// Initializing express app.
const app = express();

/**
 * Middleware configurations.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Registering users related API routes.
app.use("/api/users", userRoutes);

// Default route - sanity check route.
app.get("/", (req, res) => res.send("Server is ready"));

// Error handling middlewares.
app.use(notFound);
app.use(errorHandler);

// Starting the server on designated port.
app.listen(port, () => console.log(`Server started on port ${port}`));
