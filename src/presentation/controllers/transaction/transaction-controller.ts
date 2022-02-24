import { HttpRequest, HttpResponse } from "@presentation/protocols/http"

export class TransactionController {
    handle(httpRequest: HttpRequest): HttpResponse {
        let errorParam = 'accountOrigin'

        if (!httpRequest.body.accountDestination) {
            errorParam = 'accountDestination'
        }

        return {
            statusCode: 400,
            body: new Error(`Missing param: ${errorParam}`)
        }
    }
}