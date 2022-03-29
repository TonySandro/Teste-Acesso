import { AccountValidator } from "../../protocols/account-validation";

export const confirmingAccountExist = async (accountNumber: string, accountValidator: AccountValidator) => {
    const account: any = await accountValidator.accountExist(accountNumber)

    if (!account.balance) {
        if (account.status === 500) {
            return new Error()
        }

        return null
    }

    return account
}