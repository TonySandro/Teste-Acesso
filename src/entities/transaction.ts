import { uuid } from "uuidv4";

export class Transaction {
    public transactionId?: string

    public accountOrigin: string
    public accountDestination: string
    public value: number

    public status?: string
    public error?: string

    constructor(props: Omit<Transaction, 'transactionId'>, transactionId?: string) {
        Object.assign(this, props)
        if (!transactionId) {
            this.transactionId = uuid()
        }

    }
}