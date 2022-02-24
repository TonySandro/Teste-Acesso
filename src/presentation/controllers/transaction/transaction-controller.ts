import { MissingParamError } from "../../errors/missing-param-error"
import { HttpRequest, HttpResponse } from "../../protocols/http"

export class TransactionController {
    handle(httpRequest: HttpRequest): HttpResponse {
        let errorParam = 'accountOrigin'

        if (!httpRequest.body.accountDestination) {
            errorParam = 'accountDestination'
        }

        return {
            statusCode: 400,
            body: new MissingParamError(`Missing param: ${errorParam}`)
        }
    }
}