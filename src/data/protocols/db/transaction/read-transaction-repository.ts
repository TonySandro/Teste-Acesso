import { ReadTransactionModel } from "../../../../domain/usecases/read-transaction";

export interface ReadTransactionRepository {
    readTransaction(transaction: string): Promise<ReadTransactionModel>

}