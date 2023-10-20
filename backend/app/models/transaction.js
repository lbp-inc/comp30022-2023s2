import mongoose from "mongoose";

// This defines a payment/transaction
const transactionSchema = mongoose.Schema(
    {
        // Possible values: cash at counter, card at counter, card online, etc.
        payment_method: { type: String, required: true },

        // This associate transaction with a member, however can be empty if
        // the transaction is handled manually (say by a staff member)
        member_id: mongoose.Types.ObjectId,

        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
