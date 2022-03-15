import { accountBalanceInquiry } from "../../../infra/http/axios/helpers/api-helper";
import { AccountValidator } from "../../../presentation/protocols/account-validation";

export class AccountValidatorAdapter implements AccountValidator {
    async accountDestinationIsValid(accountDestination: string): Promise<boolean> {
        const accountData = await accountBalanceInquiry(accountDestination)
        if (accountData === null) return false;
        else return true
    }

    async accountOriginIsValid(accountOrigin: string): Promise<boolean> {
        const accountData = await accountBalanceInquiry(accountOrigin)
        if (accountData === null) return false;
        else return true
    }
}