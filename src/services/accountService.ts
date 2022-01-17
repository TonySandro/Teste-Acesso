import { Request, Response } from "express"
import { api } from "../api"

export class AccountService {
    async getAllAccounts(req: Request, res: Response) {
        try {
            const data = await api.get('/Account').then(result => {
                return result.data
            })
            return res.status(200).send(data)
        } catch (error) {
            return res.send({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async getByAccountNumber(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = await api.get(`/Account/${id}`).then(result => {
                return result.data
            })
            console.log(data)

            return res.send(data)
        } catch (error) {
            return res.send({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}

