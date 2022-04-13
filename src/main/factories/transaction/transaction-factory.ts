import { AccountValidatorAdapter } from "../../../main/adapters/validators/account-validator-adapter";
import { DbAddTransaction } from "../../../data/usecases/add-transaction/db-add-transaction";
import { AddTransactionMongoRepository } from "../../../infra/db/mongodb/transaction-repository/add/add-transaction-mongo-repository";
import { TransactionController } from "../../../presentation/controllers/transaction/transaction-controller";

export const makeTransactionController = (): TransactionController => {
    const accountValidatorAdapter = new AccountValidatorAdapter()
    const transactionMongoRepo = new AddTransactionMongoRepository()
    const addTransaction = new DbAddTransaction(transactionMongoRepo)
    const transactionController = new TransactionController(accountValidatorAdapter, addTransaction)
    return transactionController
}