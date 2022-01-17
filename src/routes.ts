import { Router } from "express";
import { AccountService } from "./services/accountService";
import { TransactionService } from "./services/transactionService";

const transaction = new TransactionService()
const account = new AccountService()

const router = Router()


router.get('/api/Account', account.getAllAccounts)
router.get('/api/Account/:id', account.getByAccountNumber)

// router.get('api/fund-transaction/:id')

router.post('/api/fund-transfer', transaction.valueTransaction)

export { router }