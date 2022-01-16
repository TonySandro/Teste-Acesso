import { Router } from "express";
import { getAccountById, getAllAccounts } from "../usecases/AccountController";
import { valueTransfer } from "../usecases/TransferController";

const router = Router()

router.get('/api/Account', getAllAccounts)
router.get('/api/Account/:id', getAccountById)

router.get('api/fund-transfer/:id')
router.post('/api/fund-transfer', valueTransfer)

export { router }