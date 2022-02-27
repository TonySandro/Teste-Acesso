import { HttpRequest, HttpResponse, Controller } from "../../protocols"
import { MissingParamError, InvalidParamError } from "../../errors"
import { badRequest, serverError } from "../..//helpers/http/http-helper"
import { AccountValidator } from "../../protocols/account-validation"
import { AddTransaction } from "../../../domain/usecases/add-transaction"

export class TransactionController implements Controller {
    constructor(
        private readonly accountValidator: AccountValidator,
        private readonly addTransaction: AddTransaction
    ) {
        this.accountValidator = accountValidator
        this.addTransaction = addTransaction
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['accountOrigin', 'accountDestination', 'value']

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { accountOrigin, accountDestination, value } = httpRequest.body
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

            this.addTransaction.addTransaction({
                accountOrigin,
                accountDestination,
                value
            })

            return {
                body: httpRequest.body,
                statusCode: 200
            }
        } catch (error) {
            return serverError()
        }
    }
}