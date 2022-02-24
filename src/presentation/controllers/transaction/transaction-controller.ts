import { HttpRequest, HttpResponse, Controller } from "../../protocols"
import { MissingParamError } from "../../errors/missing-param-error"
import { badRequest } from "../..//helpers/http/http-helper"

export class TransactionController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['accountOrigin', 'accountDestination', 'value']

        for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field))

            }
        }
    }
}