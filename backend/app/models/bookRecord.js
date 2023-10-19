import mongoose from "mongoose";

const bookRecordSchema = mongoose.Schema(
    {
        book_target: {
            type: mongoose.Types.ObjectId,
            required: true,
            unique: true,
        },
        booked_by: {
            type: String,
            required: true,
        },
        isPaid: Boolean,
    },
    {
        timestamps: true,
    }
);

const bookRecord = mongoose.model("bookRecord", bookRecordSchema);

export default bookRecord;
