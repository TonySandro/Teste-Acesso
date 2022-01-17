import { Request, Response } from "express";
import { api } from "../api";
import { TransactionController } from "../controller/transactionController";
import { adapterGetByAccountNumber } from "./helpers/methodSevice";

const transactionController = new TransactionController()

export class TransactionService {
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

    async valueTransaction(req: Request, res: Response) {
        try {
            const { accountOrigin, accountDestination, value } = req.body

            let accountOriginVerify = adapterGetByAccountNumber(accountOrigin)
            let accountDestinationVerify = adapterGetByAccountNumber(accountDestination)

            Promise.all([accountOriginVerify, accountDestinationVerify])

            if (accountOriginVerify !== undefined && accountDestinationVerify !== undefined) {
                const result = transactionController.transactionValidate(accountOrigin, accountDestination, value)
                if (result) {
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
                }
            }
            return res.status(200).json("Transactionencia realizada.")
        } catch (error) {
            res.json({
                message: error.message || 'Unexpected error.'
            })

        }
    }
}