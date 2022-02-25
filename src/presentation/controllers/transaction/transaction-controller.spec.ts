import { AccountValidator } from "../../protocols/account-validation"
import { MissingParamError, InvalidParamError } from "../../errors"
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

interface SutTypes {
    sut: TransactionController
    accountValidatorStub: AccountValidator
}

const makeSut = (): SutTypes => {
    const accountValidatorStub = makeAccountValidator()
    const sut = new TransactionController(accountValidatorStub)
    return {
        sut,
        accountValidatorStub,
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
})
