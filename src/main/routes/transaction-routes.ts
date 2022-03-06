import { Router } from "express";

export default (route: Router): void => {
    route.post('/fund-transfer', (req, res) => {
        res.json({ ok: 'ok' })
    })
}