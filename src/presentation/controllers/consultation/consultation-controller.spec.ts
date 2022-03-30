import { HttpRequest, ReadTransactionModel, ReadTransaction } from "./consultation-controller-protocols"
import { ConsultationController } from "./consultation-controller"
import { MissingParamError, ServerError } from "../../../presentation/errors"
import { success } from "../../../presentation/helpers/http/http-helper"




const makeFakeRequest = (): HttpRequest => ({
    body: {
        transactionId: "valid_transaction_id",
    }
})

const makeReadTransaction = (): ReadTransaction => {
    class ReadTransactionStub implements ReadTransaction {
        read(transactionId: string): Promise<ReadTransactionModel> {
            return new Promise(resolve => resolve({
                transactionId: "valid_transaction_id",
                status: "Confirmed"
            }))
        }
    }
    return new ReadTransactionStub()
}

interface SutTypes {
    sut: ConsultationController
    readTransaction: ReadTransaction
}

const makeSut = (): SutTypes => {
    const readTransaction = makeReadTransaction()
    const sut = new ConsultationController(readTransaction)
    return {
        sut,
        readTransaction
    }
}

describe('Consultation Controller', () => {
    test('Should return 400 if no transactionId is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                // transactionId: "valid_transaction_id"
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body.Message).toEqual(new MissingParamError("transactionId"))
    })

    test('Should return 200 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpRequest = makeFakeRequest()

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(200)
        expect(httpResponse.body).toEqual({
            transactionId: "valid_transaction_id",
            Status: "Confirmed"
        })
    })

    test('Should call readTransaction with correct values', async () => {
        const { sut, readTransaction } = makeSut()
        const readTransactionSpy = jest.spyOn(readTransaction, "read")
        await sut.handle(makeFakeRequest())
        expect(readTransactionSpy).toHaveBeenCalledWith("valid_transaction_id")
    })

    test('Should return 500 if readTransaction throws', async () => {
        const { sut, readTransaction } = makeSut()
        jest.spyOn(readTransaction, "read").mockImplementationOnce(() => {
            return new Promise((resolve, reject) => reject(new Error()))
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(500)
        expect(httpResponse.body.Message).toEqual(new ServerError(new Error()))
    })
})
