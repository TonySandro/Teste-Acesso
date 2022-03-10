import { AddTransaction } from "../../../../domain/usecases/add-transaction";
import { TransactionModel } from "../../../../domain/models/transaction";

export interface AddTransactionRepository {
    add(transaction: AddTransaction): Promise<TransactionModel>

}