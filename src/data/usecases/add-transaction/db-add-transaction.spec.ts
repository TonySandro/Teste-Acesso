import { TransactionModel } from "domain/models/transaction"
import { AddTransactionModel } from "domain/usecases/add-transaction"
import { DbAddTransaction } from "./db-add-transaction"

const makeFakeTransaction = (): TransactionModel => ({
    transactionId: 'valid_transactionId',
    accountOrigin: 'valid_accountOrigin',
    accountDestination: 'valid_accountDestination',
    value: 123
})

const makeFakeTransactionData = (): AddTransactionModel => ({
    accountOrigin: 'valid_accountOrigin',
    accountDestination: 'valid_accountDestination',
    value: 123
})

interface SutTypes {
    sut: DbAddTransaction
}

const makeSut = (): SutTypes => {
    const sut = new DbAddTransaction()
    return {
        sut,
    }
}

describe('DbAddTransaction Usecase', () => {
    test('Should return an transaction on success', async () => {
        const { sut } = makeSut()
        const transaction = await sut.addTransaction(makeFakeTransactionData())
        expect(transaction).toEqual(makeFakeTransaction())
    })
})
