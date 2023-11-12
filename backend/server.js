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
import roomHireRoutes from "./app/controllers/roomHireController.js";
import eventRoutes from "./app/router/eventRoute.js";
import activitiesRoutes from "./app/router/activities.js";
import bookingRoutes from "./app/router/booking.js";
import { notFound, errorHandler } from "./app/utils/errorHandler.js";
import config from "./config/config.js";
import Index from "./app/views/index.js";

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
app.use("/api/roomHire", roomHireRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/bookings", bookingRoutes)

// Default route - sanity check route.
app.get("/", (req, res) => res.send(Index));

// Error handling middlewares.
app.use(notFound);
app.use(errorHandler);

const formatPort = (portNum) => {
    const portStr = portNum.toString();
    let concat = "";
    for (let i = 0; i < (5-portStr.length); i++) {
        concat += " ";
    }
    return portStr + concat;
}

// Starting the server on designated port.
const welcomeMsg = `\
┌──────────────────────────────────────────────────┐\n\
│ Longbeach PLACE API Server                       │\n\
├──────────────────────────────────────────────────┤\n\
│                                                  │\n\
│ Server is now up and running.                    │\n\
│                                                  │\n\
│ Port: ${formatPort(port)}                                      │\n\
│                                                  │\n\
│         xxx       xxxxxxx        xxxxx           │\n\
│        xx x     xx  x    xx    xxxx  xxxx        │\n\
│      xxxxx      xxxxx     x   xx  x     x        │\n\
│        x           x   xxxx      xx    xx        │\n\
│       xx           xxxxxx        xxxxxxx         │\n\
│       x            x    xxx      x               │\n\
│   xxxxxxx         xx     xx     xx               │\n\
│   xxxx   xxxxxx xxxxxxxxxx    xxx                │\n\
│                                                  │\n\
│                                                  │\n\
│                                                  │\n\
└──────────────────────────────────────────────────┘\n\
`;
app.listen(port, () => console.log(welcomeMsg));
