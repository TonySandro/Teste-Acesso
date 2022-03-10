import { AccountValidator } from "../presentation/protocols/account-validation";

export class AccountValidatorAdapter implements AccountValidator {
    accountDestinationIsValid(account: string): boolean {
        return true
    }

    accountOriginIsValid(account: string): boolean {
        return true
    }
}