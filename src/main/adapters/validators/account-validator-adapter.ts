import { accountBalanceInquiry } from "../../../infra/http/axios/helpers/api-helper";
import { AccountValidator } from "../../../presentation/protocols/account-validation";

export class AccountValidatorAdapter implements AccountValidator {
    async accountExist(accountNumber: string): Promise<boolean> {
        const accountData = await accountBalanceInquiry(accountNumber)
        if (accountData === null) return false;
        else return true
    }
}