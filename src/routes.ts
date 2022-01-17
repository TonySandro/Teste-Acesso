import { Router } from "express";
import { AccountService } from "./services/accountService";
import { TransferService } from "./services/transferService";
const transfer = new TransferService()
const account = new AccountService()
const router = Router()


router.get('/api/Account', account.getAllAccounts)
router.get('/api/Account/:id', account.getByAccountNumber)

// router.get('api/fund-transfer/:id')

router.post('/api/fund-transfer', transfer.valueTransfer)
router.post('/api/deposit-value', transfer.depositValue)

export { router }