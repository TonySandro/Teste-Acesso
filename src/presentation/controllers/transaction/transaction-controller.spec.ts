import { AddTransaction, AddTransactionModel, TransactionModel } from "./transaction-controller-protocols"
import { MissingParamError, ServerError, InvalidValueError } from "../../errors"
import { TransactionController } from "./transaction-controller"
import { Validation } from "../../../presentation/helpers/validators/validation"
import { badRequest } from "../../../presentation/helpers/http/http-helper"

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate(input: any): Error {
            return null
        }
    }
    return new ValidationStub()
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
    addTransactionStub: AddTransaction
    validationStub: Validation
}

const makeSut = (): SutTypes => {
    const addTransactionStub = makeAddTransaction()
    const validationStub = makeValidation()
    const sut = new TransactionController(addTransactionStub, validationStub)
    return {
        sut,
        addTransactionStub,
        validationStub
    }
}

describe('Transaction Controller', () => {
    beforeEach((): void => {
        jest.setTimeout(80000);
        // jest.useFakeTimers('legacy')
    });

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

    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest = makeFakeRequest()

        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })

    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

        const httpRequest = makeFakeRequest()

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})
