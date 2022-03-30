import { ReadTransactionRepository } from "../../../data/protocols/db/transaction/read-transaction-repository";
import { ReadTransactionModel, ReadTransaction } from "../../../domain/usecases/read-transaction";

export class DbReadTransaction implements ReadTransaction {
    constructor(private readonly readTransaction: ReadTransactionRepository) { }

    async read(transactionId: string): Promise<ReadTransactionModel> {
        const data = await this.readTransaction.readTransaction(transactionId)

        return data
    }
}