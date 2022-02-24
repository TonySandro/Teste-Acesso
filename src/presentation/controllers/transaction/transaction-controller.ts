import { badRequest } from "../..//helpers/http/http-helper"
import { MissingParamError } from "../../errors/missing-param-error"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class TransactionController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const { accountOrigin, accountDestination, value } = httpRequest.body

        if (!accountOrigin) {
            return badRequest(new MissingParamError('accountOrigin'))
        }

        if (!accountDestination) {
            return badRequest(new MissingParamError('accountDestination'))
        }

        if (!value) {
            return badRequest(new MissingParamError('value'))
        }

    }
}