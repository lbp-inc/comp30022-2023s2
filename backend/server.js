import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./app/utils/connectDB.js";
import userRoutes from "./app/router/index.js";
import { notFound, errorHandler } from "./app/utils/errorHandler.js";
import config from "./config/config.js";

dotenv.config();

const port = process.env.PORT || config.port;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
