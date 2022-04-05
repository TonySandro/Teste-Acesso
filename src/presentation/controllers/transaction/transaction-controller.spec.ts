import { AccountValidator, AddTransaction, AddTransactionModel, TransactionModel } from "./transaction-controller-protocols"
import { MissingParamError, InvalidParamError, ServerError, InvalidValueError, InsufficientBalanceError } from "../../errors"
import { TransactionController } from "./transaction-controller"

const makeAccountValidator = (): AccountValidator => {
    class AccountValidatorStub implements AccountValidator {
        async accountExist(account: string): Promise<boolean> {
            return true
        }
    }
    return new AccountValidatorStub()
}

const makeAddTransaction = (): AddTransaction => {
    class AddTransactionStub implements AddTransaction {
        async addTransaction(transaction: AddTransactionModel): Promise<TransactionModel> {
            const fakeTransaction = {
                transactionId: 'valid_id',
                accountOrigin: 'valid_accountOrigin',
                accountDestination: 'valid_accountDestination',
                status: "Confirmed",
                value: 123,
                date: new Date("2022-04-05T01:50:59.173Z")
            }
            return new Promise(resolve => resolve(fakeTransaction))
        }
    }

    return new AddTransactionStub()
}

const makeFakeRequest = () => ({
    body: {
        accountOrigin: 'valid_accountOrigin',
        accountDestination: 'valid_accountDestination',
        value: 123
    }
})

interface SutTypes {
    sut: TransactionController
    accountValidatorStub: AccountValidator
    addTransactionStub: AddTransaction
}

const makeSut = (): SutTypes => {
    const addTransactionStub = makeAddTransaction()
    const accountValidatorStub = makeAccountValidator()
    const sut = new TransactionController(accountValidatorStub, addTransactionStub)
    return {
        sut,
        accountValidatorStub,
        addTransactionStub,
    }
}

describe('Transaction Controller - no params is provided', () => {
    test('Should return 400 if no accountOrigin is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                // accountOrigin: "valid_accountOrigin",
                accountDestination: "valid_accountDestination",
                value: 123
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new MissingParamError('accountOrigin'))
    })

    test('Should return 400 if no accountDestination is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                accountOrigin: "valid_accountOrigin",
                // accountDestination: "valid_accountDestination",
                value: 123
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new MissingParamError('accountDestination'))
    })

    test('Should return 400 if no value is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                accountOrigin: "valid_accountOrigin",
                accountDestination: "valid_accountDestination",
                // value: 123
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new MissingParamError('value'))
    })
})

describe('Transaction Controller - invalid params is provided', () => {
    test('Should return 400 if an invalid accountOrigin is provided', async () => {
        const { sut, accountValidatorStub } = makeSut()
        jest.spyOn(accountValidatorStub, 'accountExist').mockReturnValueOnce(new Promise(resolve => resolve(false)))

        const httpRequest = {
            body: {
                accountOrigin: "invalid_accountOrigin",
                accountDestination: "valid_accountDestination",
                value: 123
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new InvalidParamError('accountOrigin'))
    })

    test('Should return 400 if transaction invalid value', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                accountOrigin: "valid_accountOrigin",
                accountDestination: "valid_accountDestination",
                value: 0
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new InvalidValueError(0))
    })

    test('Should return 400 if insufficient balance', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                accountOrigin: "valid_accountOrigin",
                accountDestination: "valid_accountDestination",
                value: 999
            }
        }

        jest.spyOn(sut, "handle")
            .mockReturnValue(new Promise(resolve => resolve(
                {
                    statusCode: 400,
                    body: {
                        Status: "Error",
                        Message: new InsufficientBalanceError(httpRequest.body.value)
                    }
                }
            )))

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new InsufficientBalanceError(httpRequest.body.value))
    })
})

describe('Transaction Controller - transaction validator throws', () => {
    test('Should return 500 if TransactionValidator accountOrigin throws', async () => {
        const { sut, accountValidatorStub } = makeSut()

        jest.spyOn(accountValidatorStub, 'accountExist').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
    })

    test('Should return 500 if TransactionValidator accountDestination throws', async () => {
        const { sut, accountValidatorStub } = makeSut()

        jest.spyOn(accountValidatorStub, 'accountExist').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
    })
})
describe('Transaction Controller - ensure call with correct params', () => {
    beforeEach((): void => {
        jest.setTimeout(80000);
    });

    test('Should return 400 if accountOrigin to equal accountDestination', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            body: {
                accountOrigin: 'valid_account',
                accountDestination: 'valid_account',
                value: 123
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new InvalidParamError("accountDestination to equal accountOrigin"))
    })

})