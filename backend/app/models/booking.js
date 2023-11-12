import mongoose from "mongoose";

// This schema describes a booking relationship between an activity and a member
const bookingSchema = mongoose.Schema(
    {
        // Activity associated with this booking
        activity_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },

        // Member associated with this booking
        member_id: {
            type: mongoose.Types.ObjectId,
            required: true,
        },

        // Total amount of payment required (optional, default to 0 for free activities)
        // This should not change once booking has made
        // Outstanding payment should be calculated by adding transactions
        // (manual credit adjustments can be made using virtual transactions with no member_id stated)
        payment_required: Number,

        // Records relevant transactions (to calculate outstanding payment)
        // Note the transaction doesn't necessarily have to be made by this member
        transaction_id: [mongoose.Types.ObjectId],
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
