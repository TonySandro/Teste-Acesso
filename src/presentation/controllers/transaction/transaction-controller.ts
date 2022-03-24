import { HttpRequest, HttpResponse, Controller, AddTransaction, AccountValidator } from "./transaction-controller-protocols"
import { InvalidValueError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http/http-helper"
// import { accountBalanceInquiry } from "../../../infra/http/axios/helpers/api-helper"
// import { creditTransactionApi, debitTransactionApi } from "../../../infra/http/axios/helpers/api-helper"
import { Validation } from "../../../presentation/helpers/validators/validation"

export class TransactionController implements Controller {
    constructor(
        private readonly addTransaction: AddTransaction,
        private readonly validation: Validation
    ) {
        this.addTransaction = addTransaction
        this.validation = validation
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if (error) {
                return badRequest(error)
            }
            const { accountOrigin, accountDestination, value } = httpRequest.body
            if (value <= 0) {
                return badRequest(new InvalidValueError(value))
            }

            // const accountOriginExists = await accountBalanceInquiry(accountOrigin)
            // const accountDestinationExists = await accountBalanceInquiry(accountDestination)

            // if (!accountOriginExists) {
            //     return badRequest(new InvalidParamError('accountOrigin'))
            // }

            // if (!accountDestinationExists) {
            //     return badRequest(new InvalidParamError('accountOrigin'))
            // }

            const transaction = await this.addTransaction.addTransaction({
                accountOrigin,
                accountDestination,
                status: "Confirmed",
                value
            })

            // await creditTransactionApi(accountDestination, value)
            // await debitTransactionApi(accountOrigin, value)

            return success(transaction)
        } catch (error) {
            return serverError(error)
        }
    }
}