import { MissingParamError } from "../../errors/missing-param-error"
import { TransactionController } from "./transaction-controller"

describe('Transaction Controller', () => {
    test('Should return 400 if no accountOrigin is provided', () => {
        const sut = new TransactionController()
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
        const sut = new TransactionController()
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
        const sut = new TransactionController()
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
})
