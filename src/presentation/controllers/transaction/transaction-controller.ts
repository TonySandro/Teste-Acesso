import { HttpRequest, HttpResponse, Controller, AddTransaction, AccountValidator } from "./transaction-controller-protocols"
import { MissingParamError, InvalidParamError, InvalidValueError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http/http-helper"
// import { creditTransactionApi, debitTransactionApi } from "../../../infra/http/axios/helpers/api-helper"

export class TransactionController implements Controller {
    constructor(
        private readonly accountValidator: AccountValidator,
        private readonly addTransaction: AddTransaction
    ) {
        this.accountValidator = accountValidator
        this.addTransaction = addTransaction
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { accountOrigin, accountDestination, value } = httpRequest.body
            const requiredFields = ['accountOrigin', 'accountDestination', 'value']

            if (value <= 0) {
                return badRequest(new InvalidValueError(value))
            }

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const accountOriginIsValid = this.accountValidator.accountOriginIsValid(accountOrigin)
            if (!accountOriginIsValid) {
                return badRequest(new InvalidParamError('accountOrigin'))
            }

            const accountDestinationIsValid = this.accountValidator.accountDestinationIsValid(accountDestination)
            if (!accountDestinationIsValid) {
                return badRequest(new InvalidParamError('accountDestination'))
            }

            if (accountOrigin === accountDestination) {
                return badRequest(new InvalidParamError('accountDestination'))
            }

            // await creditTransactionApi(accountDestination, value)
            // await debitTransactionApi(accountOrigin, value)

            const transaction = await this.addTransaction.addTransaction({
                accountOrigin,
                accountDestination,
                value
            })

            return success(transaction)
        } catch (error) {
            return serverError()
        }
    }
}