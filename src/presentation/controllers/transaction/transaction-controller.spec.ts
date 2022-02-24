import { AccountValidator } from "../../protocols/account-validation"
import { MissingParamError, InvalidParamError } from "../../errors"
import { TransactionController } from "./transaction-controller"

interface SutTypes {
    sut: TransactionController
    accountValidatorStub: AccountValidator
}

const makeSut = (): SutTypes => {
    class AccountValidatorStub implements AccountValidator {
        isValid(account: string): boolean {
            return true
        }
    }

    const accountValidatorStub = new AccountValidatorStub()
    const sut = new TransactionController(accountValidatorStub)
    return {
        sut,
        accountValidatorStub
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
        jest.spyOn(accountValidatorStub, 'isValid').mockReturnValueOnce(false)
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
})
