export interface AccountValidator {
    accountExist(accountNumber: string): Promise<any>
}