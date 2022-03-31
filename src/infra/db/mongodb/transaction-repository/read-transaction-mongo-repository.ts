import { ReadTransactionRepository } from "data/protocols/db/transaction/read-transaction-repository";
import { ObjectId } from "mongodb";
import { ReadTransactionModel } from "../../../../domain/usecases/read-transaction";
import { MongoHelper } from "../helpers/mongo-helper";

export class ReadTransactionMongoRepository implements ReadTransactionRepository {
    async readTransaction(transaction: string): Promise<ReadTransactionModel> {
        try {
            const accountCollection = await MongoHelper.getCollection('transaction')
            const transactionData = await accountCollection.findOne({ _id: new ObjectId(transaction) })

            return MongoHelper.map(transactionData)
        } catch (error) {
            return error
        }
    }
}