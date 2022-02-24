import { HttpRequest, HttpResponse, Controller } from "../../protocols"
import { MissingParamError, InvalidParamError } from "../../errors"
import { badRequest } from "../..//helpers/http/http-helper"
import { AccountValidator } from "../../protocols/account-validation"

export class TransactionController implements Controller {
    constructor(private readonly accountValidator: AccountValidator) {
        this.accountValidator = accountValidator
    }

    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['accountOrigin', 'accountDestination', 'value']

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        const accountOriginIsValid = this.accountValidator.isValid(httpRequest.body.accountOrigin)
        if (!accountOriginIsValid) {
            return badRequest(new InvalidParamError('accountOrigin'))
        }
    }
}