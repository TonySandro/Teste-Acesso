import { MongoHelper } from "../helpers/mongo-helper"
import { TransactionMongoRepository } from "./transaction"

interface SutTypes {
    sut: TransactionMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new TransactionMongoRepository()
    return {
        sut
    }
}

describe('Transaction Mongo Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        const transactionCollection = MongoHelper.getCollection('transaction')
        await (await transactionCollection).deleteMany({})
    })

    test('Should return an transaction on success', async () => {
        const { sut } = makeSut()
        const transaction = await sut.addTransaction({
            accountOrigin: "valid_accountOrigin",
            accountDestination: "valid_accountDestination",
            value: 123
        })

        expect(transaction).toBeTruthy()
        expect(transaction.transactionId).toBeTruthy()
        expect(transaction.accountOrigin).toBe('valid_accountOrigin')
        expect(transaction.accountDestination).toBe('valid_accountDestination')
        expect(transaction.value).toBe(123)
    })
})
