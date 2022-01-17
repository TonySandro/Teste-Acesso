export class TransactionController {
    // Função de validação
    public transactionValidate(
        accountOrigin: string,
        accountDestination: string,
        valueAccountOrigin: number
    ): boolean {
        let balanceAccountOrigin = 0

        if (accountOrigin && accountDestination) {
            if (valueAccountOrigin >= balanceAccountOrigin) {
                return true
            }
        }
        return false
    }

}