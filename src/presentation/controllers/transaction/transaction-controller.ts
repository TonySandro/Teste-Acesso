import { MissingParamError } from "../../errors/missing-param-error"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class TransactionController {
    handle(httpRequest: HttpRequest): HttpResponse {
        let errorParam = 'accountOrigin'

        if (!httpRequest.body.accountDestination) {
            errorParam = 'accountDestination'
        }

        if (!httpRequest.body.value) {
            errorParam = 'value'
        }

        return {
            statusCode: 400,
            body: new MissingParamError(errorParam)
        }
    }
}