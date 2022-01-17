import { Schema, model, Document } from "mongoose";

interface TransactionInterface extends Document {
    id: string
    transactionId?: string

    accountOrigin: string
    accountDestination: string
    value: number

    status?: string
    error?: string
}

const TransactionSchema = new Schema({
    id: String,
    transactionId: String,

    accountOrigin: String,
    accountDestination: String,
    value: Number,

    status: String,
    error: String

}, {
    timestamps: true
})

export default model<TransactionInterface>('Transactions', TransactionSchema)