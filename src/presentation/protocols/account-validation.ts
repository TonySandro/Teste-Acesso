export interface AccountValidator {
    accountOriginIsValid(accountOrigin: string): Promise<boolean>

    accountDestinationIsValid(accountDestination: string): Promise<boolean>
}