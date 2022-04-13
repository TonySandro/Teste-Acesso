import { MongoHelper } from "../../helpers/mongo-helper"
import { AddTransactionMongoRepository } from "./add-transaction-mongo-repository"

interface SutTypes {
    sut: AddTransactionMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new AddTransactionMongoRepository()
    return {
        sut
    }
}

describe('Add Transaction Mongo Repository', () => {

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
            value: 123,
            status: "Confirmed",
            date: new Date("2022-04-05T01:50:59.173Z")
        })

        expect(transaction).toBeTruthy()
        expect(transaction.transactionId).toBeTruthy()
        expect(transaction.accountOrigin).toBe('valid_accountOrigin')
        expect(transaction.accountDestination).toBe('valid_accountDestination')
        expect(transaction.value).toBe(123)
    })
})
