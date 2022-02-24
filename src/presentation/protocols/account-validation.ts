export interface AccountValidator {
    accountOriginIsValid(account: string): boolean

    accountDestinationIsValid(account: string): boolean
}