import { TransactionModel } from "../models/transaction";

export interface AddTransactionModel {
    accountOrigin: string
    accountDestination: string
    value: number
}

export interface AddTransaction {
    addTransaction(transaction: AddTransactionModel): Promise<TransactionModel>
}