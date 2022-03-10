import { Router } from "express";
import { adaptRoute } from "../../main/adapters/express-routes-adapter";
import { makeTransactionController } from "../../main/factories/transaction/transaction-factory";

export default (route: Router): void => {
    route.post('/fund-transfer', adaptRoute(makeTransactionController()))
}