import { AddTransactionModel } from "../../../../domain/usecases/add-transaction";
import { TransactionModel } from "../../../../domain/models/transaction";

export interface AddTransactionRepository {
    addTransaction(transaction: AddTransactionModel): Promise<TransactionModel>

}