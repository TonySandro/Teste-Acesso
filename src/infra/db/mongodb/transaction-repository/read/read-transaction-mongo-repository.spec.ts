import { MongoHelper } from "../../helpers/mongo-helper"
import { ReadTransactionMongoRepository } from "./read-transaction-mongo-repository"

interface SutTypes {
    sut: ReadTransactionMongoRepository
}

const makeSut = (): SutTypes => {
    const sut = new ReadTransactionMongoRepository()
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

    test('Should return an read transaction on correct values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "readTransaction")
            .mockReturnValueOnce(new Promise(resolve => resolve({ transactionId: "62376f51e76463009332e8e0", status: "Confirmed" })))
        const transaction = await sut.readTransaction("62376f51e76463009332e8e0")

        expect(transaction).toBeTruthy()
    })

    test('Should return throw read transaction if invalid transaction id', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "readTransaction")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.readTransaction("62376f51e76463009332e8e0")

        await expect(promise).rejects.toThrow()
    })


})
