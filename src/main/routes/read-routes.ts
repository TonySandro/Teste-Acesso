import { Router } from "express";
import { makeReadTransactionController } from "../../main/factories/read-transaction/read-transaction-factory";
import { adaptConsultationRoute } from "../adapters/express/express-routes-adapter";

export default (route: Router): void => {
    route.get('/consult/:transactionId', adaptConsultationRoute(makeReadTransactionController()))
}