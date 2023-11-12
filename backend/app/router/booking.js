import express from "express"
import "../controllers/bookingController.js"
import {createBooking} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", createBooking);

export default router;