import { InvalidParamError, ServerError } from "../../../presentation/errors"
import { AccountValidator } from "../../../presentation/protocols/account-validation"
import { ConfirmingAccountsExist } from "./confirming-accounts-exist"

const makeAccountValidator = (): AccountValidator => {
    class AccountValidatorStub implements AccountValidator {
        accountExist(accountNumber: string): Promise<boolean> {
            return new Promise(resolve => resolve(true))
        }
    }
    return new AccountValidatorStub()
}

interface SutTypes {
    accountValidatorStub: AccountValidator
}

const makeSut = (): SutTypes => {
    const accountValidatorStub = makeAccountValidator()

    return {
        accountValidatorStub,
    }
}

describe('Confirming accounts exist', () => {
    test('Should call accountValidatorStub with correct accountOrigin', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountOrigin', accountValidatorStub)

        const accountIsValidSpy = jest.spyOn(accountValidatorStub, 'accountExist')
        const httpRequest = {
            accountOrigin: "valid_accountOrigin",
            accountDestination: "valid_accountDestination",
            value: 1
        }

        await sut.validate(httpRequest)
        expect(accountIsValidSpy).toHaveBeenCalledWith(httpRequest.accountOrigin)
    })

    test('Should call accountValidatorStub with correct accountDestination', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountDestination', accountValidatorStub)

        const accountIsValidSpy = jest.spyOn(accountValidatorStub, 'accountExist')
        const httpRequest = {
            accountOrigin: "valid_accountOrigin",
            accountDestination: "valid_accountDestination",
            value: 1
        }

        await sut.validate(httpRequest)
        expect(accountIsValidSpy).toHaveBeenCalledWith(httpRequest.accountDestination)
    })
})
