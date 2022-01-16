import { Request, Response } from "express";
import { api } from "../api";

export async function depositValue(req: Request, res: Response) {
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

export default async function valueTransfer(req: Request, res: Response) {
    try {
        const { accountOrigin, accountDestination, value  } = req.body

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

