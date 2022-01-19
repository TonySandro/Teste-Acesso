import { Request, Response } from "express"
import { getDataByAccountNumber } from "./http/getDataAccount"

export class AccountService {
    async getAllAccounts(req: Request, res: Response) {
        try {
            const data = await getDataByAccountNumber()

            return res.send(data)
        } catch (error) {
            return res.send({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async getByAccountNumber(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = await getDataByAccountNumber(id)

            return res.send(data)
        } catch (error) {
            return res.send({
                Status: "Error",
                Message: "Invalid account number"
            })
        }
    }
}

