import { ReadTransaction } from "domain/usecases/read-transaction";
import { MissingParamError } from "../../../presentation/errors";
import { badRequest } from "../../../presentation/helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "./consultation-controller-protocols";

export class ConsultationController implements Controller {
    constructor(private readonly readTransaction: ReadTransaction) {
        this.readTransaction = readTransaction
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { transactionId } = httpRequest.body
        if (!transactionId) {
            return badRequest(new MissingParamError("transactionId"))
        }

        this.readTransaction.read(transactionId)

        return {
            statusCode: 200,
            body: {
                transactionId: "valid_transaction_id",
                status: "Confirmed"
            }
        }
    }
}