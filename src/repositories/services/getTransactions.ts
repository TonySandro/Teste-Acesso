import { Request, Response } from "express"
import transactionSchema from "../../Schemas/transactionSchema"

export class GetTransactions {
    public async index(req: Request, res: Response) {
        const transactions = await transactionSchema.find()

        return res.json(transactions)
    }

}