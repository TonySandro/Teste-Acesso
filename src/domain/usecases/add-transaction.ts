import { TransactionModel } from "../models/transaction";

export interface AddTransactionModel {
    accountOrigin: string
    accountDestination: string
    value: number
    status: string
    date: Date
}

export interface AddTransaction {
    addTransaction(transaction: AddTransactionModel): Promise<TransactionModel>
}