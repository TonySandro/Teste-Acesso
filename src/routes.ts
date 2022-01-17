import { Router } from "express";
import { getAllAccounts } from "./services/accountService";
import { TransferService } from "./services/transferService";
const transfer = new TransferService()
const router = Router()

router.get('/api/Account', getAllAccounts)
// router.get('/api/Account/:id', getAccountById)

// router.get('api/fund-transfer/:id')
router.post('/api/fund-transfer', transfer.valueTransfer)
router.post('/api/deposit-value', transfer.depositValue)

export { router }