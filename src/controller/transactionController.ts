export class TransactionController {
    // Função de validação
    public transactionValidate(
        accountOrigin: string,
        accountDestination: string,
        valueToTransfer: number,
        balanceAccountOrigin: number
    ): boolean {

        if (accountOrigin && accountDestination) {
            if (valueToTransfer >= balanceAccountOrigin) {
                return true
            }
        }
        return false
    }

}