import {
    AddTransaction,
    AddTransactionModel,
    AddTransactionRepository,
    TransactionModel
} from "./db-add-transaction-protocols";

export class DbAddTransaction implements AddTransaction {
    constructor(private readonly addTransactionRepository: AddTransactionRepository) { }

    async addTransaction(transactionData: AddTransactionModel): Promise<TransactionModel> {
        const transaction = await this.addTransactionRepository.addTransaction(Object.assign(transactionData))

        return transaction
    }
}