import { ConsultationController } from "../../../presentation/controllers/consultation/consultation-controller";
import { DbReadTransaction } from "../../../data/usecases/read-transaction/db-read-transaction";
import { ReadTransactionMongoRepository } from "../../../infra/db/mongodb/transaction-repository/read-transaction-mongo-repository";

export const makeReadTransactionController = (): ConsultationController => {
    const readMongoRepo = new ReadTransactionMongoRepository()
    const read = new DbReadTransaction(readMongoRepo)
    const readTransacitonController = new ConsultationController(read)
    return readTransacitonController
}