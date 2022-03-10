import { AddTransactionRepository } from "../../../data/protocols/db/transaction/add-transaction-repository";
import { TransactionModel } from "../../../domain/models/transaction";
import { AddTransaction, AddTransactionModel } from "../../../domain/usecases/add-transaction";

export class DbAddTransaction implements AddTransaction {
    constructor(private readonly addTransactionRepository: AddTransactionRepository) { }

    async addTransaction(transactionData: AddTransactionModel): Promise<TransactionModel> {
        const transaction = await this.addTransactionRepository.add(Object.assign(transactionData))

        return transaction
    }
}