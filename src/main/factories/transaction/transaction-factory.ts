import { DbAddTransaction } from "../../../data/usecases/add-transaction/db-add-transaction";
import { TransactionMongoRepository } from "../../../infra/db/mongodb/transaction-repository/transaction-mongo-repository";
import { TransactionController } from "../../../presentation/controllers/transaction/transaction-controller";
import { AccountValidatorAdapter } from "../../../utils/account-validator-adapter";

export const makeTransactionController = (): TransactionController => {
    const accountValidatorAdapter = new AccountValidatorAdapter()
    const transactionMongoRepo = new TransactionMongoRepository()
    const addTransaction = new DbAddTransaction(transactionMongoRepo)
    const transactionController = new TransactionController(accountValidatorAdapter, addTransaction)
    return transactionController
}