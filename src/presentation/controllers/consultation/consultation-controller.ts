import { Controller, HttpRequest, HttpResponse, ReadTransaction } from "./consultation-controller-protocols";
import { MissingParamError } from "../../../presentation/errors";
import { badRequest, serverError } from "../../../presentation/helpers/http/http-helper";

export class ConsultationController implements Controller {
    constructor(private readonly readTransaction: ReadTransaction) {
        this.readTransaction = readTransaction
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { transactionId } = httpRequest.body
            if (!transactionId) {
                return badRequest(new MissingParamError("transactionId"))
            }

            await this.readTransaction.read(transactionId)

            return {
                statusCode: 200,
                body: {
                    transactionId: "valid_transaction_id",
                    status: "Confirmed"
                }
            }
        } catch (error) {
            return serverError(error)
        }
    }
}