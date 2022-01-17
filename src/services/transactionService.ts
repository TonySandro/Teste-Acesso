import { Request, Response } from "express";
import { api } from "../api";
import { TransactionController } from "../controller/transactionController";
import { getDataByAccountNumber } from "./http/getAccountData";
import { postCreditOrDebit } from "./http/postCreditOrDebit";

const transactionController = new TransactionController()

export class TransactionService {
    async valueTransaction(req: Request, res: Response) {
        try {
            const { accountOrigin, accountDestination, value } = req.body

            let accountOriginVerify = getDataByAccountNumber(accountOrigin)
            let accountDestinationVerify = getDataByAccountNumber(accountDestination)

            Promise.all([accountOriginVerify, accountDestinationVerify])

            if (accountOriginVerify !== undefined && accountDestinationVerify !== undefined) {
                const result = transactionController.transactionValidate(accountOrigin, accountDestination, value)
                if (result) {
                    let debit = postCreditOrDebit(accountOrigin, value, "Debit")
                    let credit = postCreditOrDebit(accountOrigin, value, "Credit")

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