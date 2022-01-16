import { Request, Response } from "express";
import { api } from "../api";

export async function valueTransfer(req: Request, res: Response) {
    try {
        const { accountNumber, value, type } = req.body

        await api.post(`/Account`, {
            accountNumber: accountNumber,
            value: value,
            type: type
        })
        
        return res.status(201).send("Confirmed")
    } catch (error) {
        return res.status(400).json({
            message: error.message || 'Unexpected error.'
        })
    }
}

