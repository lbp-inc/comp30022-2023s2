import express from "express"
import "../controllers/bookingController.js"
import {
    createBooking,
    getBooking,
    getBookingByActivity,
    getBookingByMember,
    getBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", createBooking);
router.get("/", getBookings);
router.get("/:id", getBooking);
router.get("/member/:id", getBookingByMember);
router.get("/activity/:id", getBookingByActivity);

export default router;