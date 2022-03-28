import { AccountValidator } from "../../protocols/account-validation";
import { InvalidParamError } from "../../errors";
import { Validation } from "./validation";

export class ConfirmingAccountsExist implements Validation {
    constructor(
        private readonly accountNumber: string,
        private readonly accountValidator: AccountValidator
    ) {
        this.accountNumber = accountNumber
        this.accountValidator = accountValidator
    }

    async validate(input: any): Promise<Error> {
        const accountExist = await this.accountValidator.accountExist(input[this.accountNumber])
        if (!accountExist) {
            return new InvalidParamError(this.accountNumber)
        }
    }
}