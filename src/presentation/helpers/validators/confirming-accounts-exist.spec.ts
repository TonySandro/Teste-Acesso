import { InvalidParamError, ServerError } from "../../../presentation/errors"
import { AccountValidator } from "../../../presentation/protocols/account-validation"
import { badRequest } from "../http/http-helper";
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

        await sut.validate('accountOrigin')
        expect(accountIsValidSpy).toHaveBeenCalledWith('accountOrigin')
    })

    test('Should call accountValidatorStub with correct accountDestination', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountDestination', accountValidatorStub)

        const accountIsValidSpy = jest.spyOn(accountValidatorStub, 'accountExist')

        await sut.validate('accountDestination')
        expect(accountIsValidSpy).toHaveBeenCalledWith('accountDestination')
    })

    test('Should return throw if Validator accountOrigin throws', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountOrigin', accountValidatorStub)

        jest.spyOn(accountValidatorStub, 'accountExist').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse: any = await sut.validate('accountOrigin')
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
    })

    test('Should return throw if Validator accountDestination throws', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountDestination', accountValidatorStub)

        jest.spyOn(accountValidatorStub, 'accountExist').mockImplementationOnce(() => {
            throw new Error()
        })
        const httpResponse: any = await sut.validate('accountDestination')
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
    })

    test('Should return an error if valitor returns accountDestination false', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountDestination', accountValidatorStub)

        jest.spyOn(accountValidatorStub, 'accountExist').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const error = await sut.validate('accountDestination')

        expect(error).toEqual(new InvalidParamError('accountDestination'))
    })

    test('Should return an error if valitor returns accountOrigin false', async () => {
        const { accountValidatorStub } = makeSut()
        const sut = new ConfirmingAccountsExist('accountOrigin', accountValidatorStub)

        jest.spyOn(accountValidatorStub, 'accountExist').mockReturnValueOnce(new Promise(resolve => resolve(false)))
        const error = await sut.validate('accountOrigin')

        expect(error).toEqual(new InvalidParamError('accountOrigin'))
    })

})
