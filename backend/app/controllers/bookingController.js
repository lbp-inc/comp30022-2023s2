import Booking from "../models/booking.js"
import mongoose from "mongoose";

// Not found string. Does not have an actual meaning.
const NotFound = "                                                 xx\n            xxxxx                                x\n           xx   x                                x\n           x    x                               xx                                      xxxxx\n           x    x                              xx                                      xx    xxx    xxxx\n          x     x                              xx                                      x        x  xx   x\n               x                              x                                         x        xxx    x\n          x   x                              x  x                                       x         x     x\n          xx x                              x                                            x              x\n       xxxxxxxx      xx                     x  x                                         xx            xx\n    xxx   xx   xx  xxxx      x     xxxxx   x   xxxx         xx                            xx          xx\nxxx      xxxxxxxxxx xx      xx     x  x    x  x   x       xxx         x                    x         xx\n         x      x   x      xx     x xx     x x    x         x        xx    xx  x x     x    xx     xx\n         x      x   x      xx     xxx     x  xx xxx     x   x        x    xxxxxx x    xx     xx xxx\n         x     xx    x   x   x   xxxx   xx   x xx     x     x     x xx  xx xx  x  x   xx    xxxxx\n         x   xx      xxxx    xxxx   xxxx    xx  xx  xx       x   x   xxx   x   x  x   xx  xxx\n         x xx                               xx    xxx        xxx     xx    x   x  x  x xxxxx\n          x                                 x                       xx      xxx   xxx\n                                                                  xxx\n                                                                 x  x\n                                                               xx   x\n                                                               x    x\n                                                               x   x\n                                                               x  xx\n                                                               xxxx\n                                                                x";

export async function createBooking(req, res) {
    console.log(req.body);
    const { activity_id, member_id, payment_required } = req.body;
    const newBooking = new Booking ({
        activity_id: new mongoose.Types.ObjectId(activity_id),
        member_id: new mongoose.Types.ObjectId(member_id),
        payment_required: payment_required,
    });

    let result = await newBooking.save();
    console.log(`New booking created: id: ${newBooking._id}`);
    res.send(result).status(204);
}

// Get all bookings from database and return as json
export async function getBookings(req, res) {
    res.send(await Booking.find()).status(200);
}

async function queryBookings(req, res, query) {
    try {
        let result = await Booking.find(query);

        if (!result || !result[0]) res.send(NotFound + "\nBooking not found").status(404);
        else res.send(result[0]).status(200);
    }
    catch (e) {
        res.send(e.message).status(400);
    }
}

// Get a specific booking by id
export async function getBooking(req, res) {
    let query = {_id: new mongoose.Types.ObjectId(req.params.id)};
    await queryBookings(req, res, query);
}

export async function getBookingByMember(req, res) {
    let query = {member_id: new mongoose.Types.ObjectId(req.params.id)};
    await queryBookings(req, res, query);
}

export async function getBookingByActivity(req, res) {
    let query = {activity_id: new mongoose.Types.ObjectId(req.params.id)};
    await queryBookings(req, res, query);
}

export async function removeBooking(req, res) {
    const { bookingId } = req.body;
    console.log(`Booking removed: id: ${bookingId}`);
}