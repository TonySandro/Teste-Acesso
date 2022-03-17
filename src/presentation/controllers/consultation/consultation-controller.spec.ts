import { MissingParamError } from "../../../presentation/errors"
import { ConsultationController } from "./consultation-controller"

const makeSut = () => {
    const sut = new ConsultationController()
    return {
        sut
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
})
