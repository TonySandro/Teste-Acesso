import { ReadTransactionRepository, ReadTransactionModel, ReadTransaction } from "./db-read-transaction-protocols"

export class DbReadTransaction implements ReadTransaction {
    constructor(private readonly readTransaction: ReadTransactionRepository) { }

    async read(transactionId: string): Promise<ReadTransactionModel> {
        const data = await this.readTransaction.readTransaction(transactionId)

        return data
    }
}