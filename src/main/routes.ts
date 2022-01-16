import { Router } from "express";
import { getAccountById, getAllAccounts } from "../usecases/AccountController";
import valueTransfer, { depositValue } from "../usecases/TransferController";

const router = Router()

router.get('/api/Account', getAllAccounts)
router.get('/api/Account/:id', getAccountById)

router.get('api/fund-transfer/:id')
router.post('/api/fund-transfer', valueTransfer)
router.post('/api/deposit-value', depositValue)

export { router }