import { HttpRequest, HttpResponse, Controller, AddTransaction, AccountValidator } from "./transaction-controller-protocols"
import { MissingParamError, InvalidParamError, InvalidValueError, ExternalServerError, InsufficientBalanceError } from "../../errors"
import { badRequest, externalServerError, serverError, success } from "../../helpers/http/http-helper"
import { accountBalanceInquiry } from "../../../infra/http/axios/helpers/api-helper"
import { creditTransactionApi, debitTransactionApi } from "../../../infra/http/axios/helpers/api-helper"
import { confirmingAccountExist } from "../../../presentation/helpers/validators/confirming-accounts-exist"

export class TransactionController implements Controller {
    constructor(
        private readonly accountValidator: AccountValidator,
        private readonly addTransaction: AddTransaction,
    ) {
        this.accountValidator = accountValidator
        this.addTransaction = addTransaction
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const { accountOrigin, accountDestination, value } = httpRequest.body
            const requiredFields = ['accountOrigin', 'accountDestination', 'value']

            if (value <= 0) {
                return badRequest(new InvalidValueError(value))
            }

            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            if (accountOrigin === accountDestination) {
                return badRequest(new InvalidParamError('accountDestination to equal accountOrigin'))
            }

            const accountOriginExist = await confirmingAccountExist(accountOrigin, this.accountValidator)
            if (accountOriginExist == "Error") {
                return externalServerError(new ExternalServerError())
            }

            if (!accountOriginExist) {
                return badRequest(new InvalidParamError('accountOrigin'))
            }

            if (accountOriginExist.balance < value) {
                return badRequest(new InsufficientBalanceError(value))
            }

            const accountDestinationExist = await confirmingAccountExist(accountDestination, this.accountValidator)
            if (!accountDestinationExist) {
                return badRequest(new InvalidParamError('accountDestination'))
            }

            const transaction = await this.addTransaction.addTransaction({
                accountOrigin,
                accountDestination,
                status: "Confirmed",
                value
            })

            await creditTransactionApi(accountDestination, value)
            await debitTransactionApi(accountOrigin, value)

            return success(transaction)
        } catch (error) {
            return serverError(error)
        }
    }
}