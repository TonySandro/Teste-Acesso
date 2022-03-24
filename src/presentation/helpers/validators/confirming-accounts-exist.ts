import { AccountValidator } from "../../protocols/account-validation";
import { InvalidParamError } from "../../errors";
import { Validation } from "./validation";
import { serverError } from "../http/http-helper";

export class ConfirmingAccountsExist implements Validation {
    constructor(
        private readonly accountNumber: string,
        private readonly accountValidator: AccountValidator
    ) {
        this.accountNumber = accountNumber
        this.accountValidator = accountValidator
    }

    async validate(input: any) {
        try {
            const accountExist = await this.accountValidator.accountExist(this.accountNumber)
            if (!accountExist) {
                return new InvalidParamError(input)
            }
        } catch (error) {
            return serverError(error)
        }
    }
}