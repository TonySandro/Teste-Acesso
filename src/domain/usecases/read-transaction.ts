export interface ReadTransactionModel {
    transactionId: string
    status: string
}

export interface ReadTransaction {
    read(transaction: string): Promise<ReadTransactionModel>
}