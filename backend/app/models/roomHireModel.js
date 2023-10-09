import mongoose from "mongoose";

const roomHireSchema = mongoose.Schema(
    {
        roomName: {
            type: String,
            require: true,
        },
        startTime: {
            type: Date,
            require: true,
        },
        endTime: {
            type: Date,
            require: true,
        },
        bookingName: {
            type: String,
            require: true,
        },
        bookingEmail: {
            type: String,
            require: true,
        },
        bookingPhone: {
            type: String,
            require: true,
        },
        bookingReason: {
            type: String,
            require: true,
        },
        status: {
            type: Number,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);


const RoomHire = mongoose.model("RoomHire", roomHireSchema);

export default RoomHire;