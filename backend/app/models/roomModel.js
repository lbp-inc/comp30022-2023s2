import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
    {
        roomName: {
            type: String,
            require: true,
        },
        roomCapacity: {
            type: Number,
            require: true,
        },
        roomDescription: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
);


const Room = mongoose.model("Room", roomSchema);

export default Room;