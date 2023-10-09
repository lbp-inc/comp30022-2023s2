import mongoose from "mongoose";

const DonationsInfoSchema = new mongoose.Schema({
    donationAmount: Number,
    date: Date,
    firstName: String,
    lastName: String,
    email: String,
    comments: String,
    status: String,
});

const DonationsInfo = mongoose.model('DonationsInfo', DonationsInfoSchema);

export default DonationsInfo;