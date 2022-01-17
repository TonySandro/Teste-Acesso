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

        await transactionSchema.create(transaction)

        return transaction
    }
}