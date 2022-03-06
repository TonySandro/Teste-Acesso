import { TransactionModel } from "domain/models/transaction";
import { AddTransactionModel } from "domain/usecases/add-transaction";
import { MongoHelper } from "../helpers/mongo-helper";

export class TransactionMongoRepository {
    async addTransaction(transactionData: AddTransactionModel): Promise<TransactionModel> {
        const accountCollection = await MongoHelper.getCollection('transaction')
        const result = await accountCollection.insertOne(transactionData)
        const transaction = await accountCollection.findOne(result.insertedId)
        return MongoHelper.map(transaction);
    }

}