import { DbAddTransaction } from "../../../data/usecases/add-transaction/db-add-transaction";
import { TransactionMongoRepository } from "../../../infra/db/mongodb/transaction-repository/transaction-mongo-repository";
import { TransactionController } from "../../../presentation/controllers/transaction/transaction-controller";
import { makeTransactionValidation } from "./transaction-validation";

export const makeTransactionController = (): TransactionController => {
    const transactionMongoRepo = new TransactionMongoRepository()
    const addTransaction = new DbAddTransaction(transactionMongoRepo)
    const transactionController = new TransactionController(addTransaction, makeTransactionValidation())
    return transactionController
}