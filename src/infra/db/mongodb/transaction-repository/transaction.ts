import { AddTransactionRepository } from "../../../../data/protocols/db/transaction/add-transaction-repository";
import { TransactionModel } from "../../../../domain/models/transaction";
import { AddTransactionModel } from "../../../../domain/usecases/add-transaction";
import { MongoHelper } from "../helpers/mongo-helper";

export class TransactionMongoRepository implements AddTransactionRepository {
    async addTransaction(transaction: AddTransactionModel): Promise<TransactionModel> {
        const accountCollection = await MongoHelper.getCollection('transaction')
        const result = await accountCollection.insertOne(transaction)
        const transactionData = await accountCollection.findOne(result.insertedId)
        return MongoHelper.map(transactionData);
    }

}