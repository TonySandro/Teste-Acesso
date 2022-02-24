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
    })
})
