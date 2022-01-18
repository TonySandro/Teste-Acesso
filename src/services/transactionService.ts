import { Request, Response } from "express";
import { api } from "../api";
import { TransactionController } from "../controller/transactionController";
import { CreateTransactions } from "../repositories/services/createTransaction";
import { getDataByAccountNumber } from "./http/getDataAccount";
import { postCreditOrDebit } from "./http/postCreditOrDebit";

const transactionController = new TransactionController()
const createTransactions = new CreateTransactions()

export class TransactionService {
    async valueTransaction(req: Request, res: Response) {
        try {
            const { accountOrigin, accountDestination, value } = req.body

            let accountOriginVerify = getDataByAccountNumber(accountOrigin)
            let accountDestinationVerify = getDataByAccountNumber(accountDestination)

            Promise.all([accountOriginVerify, accountDestinationVerify])

            if ((await Promise.resolve(accountOriginVerify)).status !== 200 &&
                (await Promise.resolve(accountDestinationVerify)).status !== 200) {

                const result = transactionController.transactionValidate(accountOrigin, accountDestination, value, 200)
                //If validation returns true
                if (result) {
                    //Carry out the credit and debit transaction
                    await postCreditOrDebit(accountOrigin, accountDestination, value)
                }
            }
            //Send the transaction to the database and return the transactionId
            const transaction = createTransactions.insertTransaction(req.body)

            return res.status(200).json((await transaction).transactionId)
        } catch (error) {
            res.json({
                message: error.message || 'Unexpected error.'
            })

        }
    }
}