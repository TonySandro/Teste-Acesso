import { Router } from "express";
import { TransactionController } from "./controller/transactionController";
import { AccountService } from "./services/accountService";
import { TransactionService } from "./services/transactionService";

const transactionController = new TransactionController()
const transaction = new TransactionService()
const account = new AccountService()

const router = Router()


router.get('/api/Account', account.getAllAccounts)
router.get('/api/Account/:id', account.getByAccountNumber)

router.get('/api/index', transactionController.index)

// router.get('api/fund-transaction/:id')

router.post('/api/fund-transfer', transaction.valueTransaction)

router.post('/api/store', transactionController.store)

export { router }