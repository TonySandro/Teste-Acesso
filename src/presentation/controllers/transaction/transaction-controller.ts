import { badRequest } from "../..//helpers/http/http-helper"
import { MissingParamError } from "../../errors/missing-param-error"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class TransactionController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['accountOrigin', 'accountDestination', 'value']

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))

            }
        }
    }
}