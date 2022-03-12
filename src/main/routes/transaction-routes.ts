import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-routes-adapter";
import { makeTransactionController } from "../../main/factories/transaction/transaction-factory";

export default (route: Router): void => {
    route.post('/fund-transfer', adaptRoute(makeTransactionController()))
}