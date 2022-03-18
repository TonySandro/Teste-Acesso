export interface ConsultationModel {
    transactionId: string
    status: string
}

export interface ReadTransaction {
    read(transaction: string): Promise<ConsultationModel>
}