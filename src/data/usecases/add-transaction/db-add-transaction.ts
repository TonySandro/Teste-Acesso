import { TransactionModel } from "domain/models/transaction";
import { AddTransaction, AddTransactionModel } from "../../../domain/usecases/add-transaction";

export class DbAddTransaction implements AddTransaction {
    async addTransaction(transactionData: AddTransactionModel): Promise<TransactionModel> {
        return {
            transactionId: "valid_transactionId",
            accountOrigin: "valid_accountOrigin",
            accountDestination: "valid_accountDestination",
            value: 123
        }
    }
}