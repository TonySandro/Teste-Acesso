export interface ReadTransactionModel {
    transactionId: string
    status: string
}

export interface ReadTransaction {
    read(transactionId: string): Promise<ReadTransactionModel>
}