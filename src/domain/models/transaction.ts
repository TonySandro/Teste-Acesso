export interface TransactionModel {
    transactionId: string
    accountOrigin: string
    accountDestination: string
    status?: string
    value: number
}