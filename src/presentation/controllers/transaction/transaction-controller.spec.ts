import { AccountValidator, AddTransaction, AddTransactionModel, TransactionModel } from "./transaction-controller-protocols"
import { MissingParamError, InvalidParamError, ServerError } from "../../errors"
import { TransactionController } from "./transaction-controller"

const makeAccountValidator = (): AccountValidator => {
    class AccountValidatorStub implements AccountValidator {
        accountOriginIsValid(account: string): boolean {
            return true
        }
        accountDestinationIsValid(account: string): boolean {
            return true
        }
    }
    return new AccountValidatorStub()
}

const makeAddTransaction = (): AddTransaction => {
    class AddTransactionStub implements AddTransaction {
        addTransaction(transaction: AddTransactionModel): TransactionModel {
            const fakeTransaction = {
                transactionId: 'valid_id',
                accountOrigin: 'valid_accountOrigin',
                accountDestination: 'valid_accountDestination',
                value: 123
            }
            return fakeTransaction
        }
    }
    return new AddTransactionStub()
}

const makeFakeTransaction = () => ({
    accountOrigin: 'any_accountOrigin',
    accountDestination: 'any_accountDestination',
    value: 123
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
        addTransactionStub
    }
}

describe('Transaction Controller', () => {
    test('Should return 400 if no accountOrigin is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                // accountOrigin: "any_accountOrigin",
                accountDestination: "any_accountDestination",
                value: 123
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('accountOrigin'))
    })

    test('Should return 400 if no accountDestination is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                accountOrigin: "any_accountOrigin",
                // accountDestination: "any_accountDestination",
                value: 123
            }
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('accountDestination'))
    })

    test('Should return 400 if no value is provided', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                accountOrigin: "any_accountOrigin",
                accountDestination: "any_accountDestination"
                // value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new MissingParamError('value'))
    })

    test('Should return 400 if an invalid accountOrigin is provided', () => {
        const { sut, accountValidatorStub } = makeSut()
        jest.spyOn(accountValidatorStub, 'accountOriginIsValid').mockReturnValueOnce(false)

        const httpRequest = {
            body: {
                accountOrigin: "invalid_accountOrigin",
                accountDestination: "any_accountDestination",
                value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('accountOrigin'))
    })

    test('Should return 400 if an invalid accountDestination is provided', () => {
        const { sut, accountValidatorStub } = makeSut()
        jest.spyOn(accountValidatorStub, 'accountDestinationIsValid').mockReturnValueOnce(false)
        const httpRequest = {
            body: {
                accountOrigin: "any_accountOrigin",
                accountDestination: "invalid_accountDestination",
                value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError('accountDestination'))
    })

    test('Should call TransactionValidator with correct accounts', () => {
        const { sut, accountValidatorStub } = makeSut()

        const accountOriginIsValidSpy = jest.spyOn(accountValidatorStub, 'accountOriginIsValid')
        const accountDestinationIsValid = jest.spyOn(accountValidatorStub, 'accountDestinationIsValid')

        const httpRequest = {
            body: makeFakeTransaction()
        }

        sut.handle(httpRequest)
        expect(accountOriginIsValidSpy).toHaveBeenCalledWith('any_accountOrigin')
        expect(accountDestinationIsValid).toHaveBeenCalledWith('any_accountDestination')
    })

    test('Should return 500 if TransactionValidator accountOrigin throws', () => {
        const { sut, accountValidatorStub } = makeSut()

        jest.spyOn(accountValidatorStub, 'accountOriginIsValid').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                accountOrigin: "any_accountOrigin",
                accountDestination: "any_accountDestination",
                value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 500 if TransactionValidator accountDestination throws', () => {
        const { sut, accountValidatorStub } = makeSut()

        jest.spyOn(accountValidatorStub, 'accountDestinationIsValid').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpRequest = {
            body: {
                accountOrigin: "any_accountOrigin",
                accountDestination: "any_accountDestination",
                value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body).toEqual(new ServerError())
    })

    test('Should return 400 if accountOrigin to equal accountDestination', () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                accountOrigin: "id_account",
                accountDestination: "id_account",
                value: 123
            }
        }

        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new InvalidParamError("accountDestination"))
    })

    test('Should call AddTransaction with correct values', () => {
        const { sut, addTransactionStub } = makeSut()

        const addSpy = jest.spyOn(addTransactionStub, 'addTransaction')

        const httpRequest = {
            body: {
                accountOrigin: 'valid_accountOrigin',
                accountDestination: 'valid_accountDestination',
                value: 123
            }
        }

        sut.handle(httpRequest)
        expect(addSpy).toHaveBeenCalledWith({
            accountOrigin: 'valid_accountOrigin',
            accountDestination: 'valid_accountDestination',
            value: 123
        })
    })
})
