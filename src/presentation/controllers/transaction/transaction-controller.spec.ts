import { AccountValidator, AddTransaction, AddTransactionModel, TransactionModel } from "./transaction-controller-protocols"
import { MissingParamError, InvalidParamError, ServerError, InvalidValueError } from "../../errors"
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
                value: 123
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

describe('Transaction Controller', () => {
    beforeEach((): void => {
        jest.setTimeout(80000);
        // jest.useFakeTimers('legacy')
    });

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

    test('Should return 400 if an invalid accountDestination is provided', async () => {
        const { sut, accountValidatorStub } = makeSut()
        jest.spyOn(accountValidatorStub, 'accountExist').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const httpRequest = {
            body: {
                accountOrigin: "valid_accountOrigin",
                accountDestination: "invalid_accountDestination",
                value: 123
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new InvalidParamError('accountDestination'))
    })

    test('Should call TransactionValidator with correct accounts', async () => {
        const { sut, accountValidatorStub } = makeSut()

        const accountOriginIsValidSpy = jest.spyOn(accountValidatorStub, 'accountExist')
        const accountDestinationIsValid = jest.spyOn(accountValidatorStub, 'accountExist')

        await sut.handle(makeFakeRequest())
        expect(accountOriginIsValidSpy).toHaveBeenCalledWith('valid_accountOrigin')
        expect(accountDestinationIsValid).toHaveBeenCalledWith('valid_accountDestination')
    })

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

    test('Should call AddTransaction with correct values', async () => {
        const { sut, addTransactionStub } = makeSut()

        const addSpy = jest.spyOn(addTransactionStub, 'addTransaction')

        await sut.handle(makeFakeRequest())
        expect(addSpy).toHaveBeenCalledWith({
            accountOrigin: 'valid_accountOrigin',
            accountDestination: 'valid_accountDestination',
            status: "Confirmed",
            value: 123
        })
    })

    test('Should return 500 if AddTransaction throws', async () => {
        const { sut, addTransactionStub } = makeSut()

        jest.spyOn(addTransactionStub, 'addTransaction').mockImplementationOnce(async () => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
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

    // test('Should return 200 if valid data is provided', async () => {
    //     const { sut } = makeSut()

    //     const httpResponse = await sut.handle(makeFakeRequest())
    //     expect(httpResponse.statusCode).toBe(200)
    //     expect(httpResponse.body).toEqual({
    //         transactionId: "valid_id",
    //         accountOrigin: "valid_accountOrigin",
    //         accountDestination: "valid_accountDestination",
    //         status: "Confirmed",
    //         value: 123
    //     })
    // })
})