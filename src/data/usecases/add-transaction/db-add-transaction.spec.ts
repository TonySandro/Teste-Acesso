import {
    AddTransactionModel,
    AddTransactionRepository,
    TransactionModel
} from "./db-add-transaction-protocols";
import { DbAddTransaction } from "./db-add-transaction"

const makeAddTransactionRepository = (): AddTransactionRepository => {
    class AddTransactionRepositoryStub implements AddTransactionRepository {
        async addTransaction(transactionData: AddTransactionModel): Promise<TransactionModel> {
            return new Promise(resolve => resolve(makeFakeTransaction()))
        }
    }
    return new AddTransactionRepositoryStub()
}

const makeFakeTransaction = (): TransactionModel => ({
    transactionId: 'valid_transactionId',
    accountOrigin: 'valid_accountOrigin',
    accountDestination: 'valid_accountDestination',
    value: 123,
    status: "Confirmed"
})

const makeFakeTransactionData = (): AddTransactionModel => ({
    accountOrigin: 'valid_accountOrigin',
    accountDestination: 'valid_accountDestination',
    value: 123,
    status: "Confirmed"
})

interface SutTypes {
    sut: DbAddTransaction
    addTransactionRepositoryStub: AddTransactionRepository
}

const makeSut = (): SutTypes => {
    const addTransactionRepositoryStub = makeAddTransactionRepository()
    const sut = new DbAddTransaction(addTransactionRepositoryStub)
    return {
        sut,
        addTransactionRepositoryStub
    }
}

describe('DbAddTransaction Usecase', () => {
    test('Should return an transaction on success', async () => {
        const { sut } = makeSut()
        const transaction = await sut.addTransaction(makeFakeTransactionData())
        expect(transaction).toEqual(makeFakeTransaction())
    })

    test('Should throw if addTransactionRepository throws', async () => {
        const { sut, addTransactionRepositoryStub } = makeSut()

        jest.spyOn(addTransactionRepositoryStub, 'addTransaction')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

        const promise = sut.addTransaction(makeFakeTransactionData())
        await expect(promise).rejects.toThrow()
    })
})
