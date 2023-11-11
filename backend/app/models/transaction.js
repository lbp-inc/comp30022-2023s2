import mongoose from "mongoose";

// This defines a payment/transaction
const transactionSchema = mongoose.Schema(
    {
        // Possible values: cash at counter, card at counter, card online, credit adjustment, etc.
        payment_method: { type: String, required: true },

        // Records who **made** the payment, however can be empty if
        // the transaction is handled manually (say credit adjustment by a staff member)
        // or the payment is made by a guest member (without an account)
        member_id: mongoose.Types.ObjectId,

        amount: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
