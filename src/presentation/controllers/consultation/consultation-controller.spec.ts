import { ConsultationModel, ReadTransaction } from "../../../domain/usecases/read-transaction"
import { MissingParamError } from "../../../presentation/errors"
import { ConsultationController } from "./consultation-controller"
import { HttpRequest } from "./consultation-controller-protocols"

const makeFakeRequest = (): HttpRequest => ({
    body: {
        transactionId: "valid_transaction_id",
    }
})

const makeReadTransaction = (): ReadTransaction => {
    class ReadTransactionStub implements ReadTransaction {
        read(transactionId: string): Promise<ConsultationModel> {
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
            status: "Confirmed" || "Error"
        })
    })

    test('Should call readTransaction with correct values', async () => {
        const { sut, readTransaction } = makeSut()
        const readTransactionSpy = jest.spyOn(readTransaction, "read")
        await sut.handle(makeFakeRequest())
        expect(readTransactionSpy).toHaveBeenCalledWith("valid_transaction_id")
    })
})
