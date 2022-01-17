import { uuid } from "uuidv4"
import { Transaction } from "../../entities/transaction"
import transactionSchema from "../../Schemas/transactionSchema"

export class CreateTransactions {
    async insertTransaction(transactions: any) {
        const transaction = new Transaction(
            {
                accountOrigin: transactions.accountOrigin,
                accountDestination: transactions.accountDestination,
                value: transactions.value,
                status: 'Confirmed',
            }
        )

        console.log("Ops", transaction)
        // await transactionSchema.create(transaction)

        return transaction
    }
}