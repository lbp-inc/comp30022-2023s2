import Booking from "../models/booking.js"

export async function createBooking(req, res) {
    const { activityId, memberId, paymentRequired } = req.body;
    const newBooking = new Booking ({
        activity_id: activityId,
        member_id: memberId,
        payment_required: paymentRequired,
    });

    let result = await newBooking.save();
    res.send(result).status(204);
}