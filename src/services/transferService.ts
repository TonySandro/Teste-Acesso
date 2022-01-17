import { Request, Response } from "express";
import { api } from "../api";

export class TransferService {
    async depositValue(req: Request, res: Response) {
        try {
            const { accountNumber, value, type } = req.body

            await api.post(`/Account`, {
                accountNumber: accountNumber,
                value: value,
                type: type
            })

            return res.status(201).send("Confirmed")
        } catch (error) {
            return res.json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async valueTransfer(req: Request, res: Response) {
        try {
            //SÓ DEVE SER TRANSFERIDO CONTAS COM O SALDO MAIOR DO QUE 0
            const { accountOrigin, accountDestination, value } = req.body

            let debit = api.post(`/Account`, {
                accountNumber: accountOrigin,
                value: value,
                type: "Debit"
            })
            let credit = api.post(`/Account`, {
                accountNumber: accountDestination,
                value: value,
                type: "Credit"
            })

            Promise.all([debit, credit])
            return res.status(200).json("Transferencia realizada.")
        } catch (error) {
            res.json({
                message: error.message || 'Unexpected error.'
            })

        }
    }
}