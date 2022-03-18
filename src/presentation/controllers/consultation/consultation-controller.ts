import { MissingParamError } from "../../../presentation/errors";
import { badRequest } from "../../../presentation/helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "./consultation-controller-protocols";

export class ConsultationController implements Controller {
    constructor() { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if (!httpRequest.body.transactionId) {
            return badRequest(new MissingParamError("transactionId"))
        }

        return {
            statusCode: 200,
            body: {
                transactionId: "valid_transaction_id",
                status: "Confirmed"
            }
        }
    }
}