import { ReadTransactionRepository } from "../../../data/protocols/db/transaction/read-transaction-repository"
import { ReadTransactionModel } from "../../../domain/usecases/read-transaction"
import { DbReadTransaction } from "./db-read-transaction"

const makeReadTransactionRepository = (): ReadTransactionRepository => {
    class ReadTransactionRepositoryStub implements ReadTransactionRepository {
        async readTransaction(transaction: string): Promise<ReadTransactionModel> {
            return new Promise(resolve => resolve(makeFakeTransaction()))

        }
    }
    return new ReadTransactionRepositoryStub()
}

const makeFakeTransaction = (): ReadTransactionModel => ({
    transactionId: 'valid_transactionId',
    status: "Confirmed"
})

const makeSut = () => {
    const readTransactionRepository = makeReadTransactionRepository()
    const sut = new DbReadTransaction(readTransactionRepository)
    return {
        sut,
        readTransactionRepository
    }
}

describe('DbReadTransaction Usecase', () => {
    test('Should call readTransactionRepository with correct transactionId', async () => {
        const { sut, readTransactionRepository } = makeSut()

        const readTransactionRepoSpy = jest.spyOn(readTransactionRepository, 'readTransaction')

        await sut.read('valid_transactionId')
        expect(readTransactionRepoSpy).toHaveBeenCalledWith('valid_transactionId')
    })

    test('Should throw if readTransactionRepository throws', async () => {
        const { sut, readTransactionRepository } = makeSut()

        jest.spyOn(readTransactionRepository, 'readTransaction')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

        const promise = sut.read('valid_transactionId')
        await expect(promise).rejects.toThrow()
    })
})
