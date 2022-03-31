import { Controller, HttpRequest, HttpResponse, ReadTransaction } from "./consultation-controller-protocols";
import { InvalidParamError, MissingParamError } from "../../../presentation/errors";
import { badRequest, serverError, success } from "../../../presentation/helpers/http/http-helper";

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

            const transactionData = await this.readTransaction.read(transactionId)

            if (!transactionData) {
                return badRequest(new InvalidParamError("transactionId"))
            }

            return success(transactionData)
        } catch (error) {
            return serverError(error)
        }
    }
}