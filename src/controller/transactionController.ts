import { Request, Response } from "express"
import TransactionSchema from "../Schemas/transactionSchema"



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

    public async index(req: Request, res: Response) {
        const transactions = await TransactionSchema.find()

        return res.json(transactions)
    }

    public async store(req: Request, res: Response) {
        const transactions = req.body
        // const transactions = await TransactionSchema.create(req.body)

        console.log(transactions)

        return res.json(transactions)
    }


}