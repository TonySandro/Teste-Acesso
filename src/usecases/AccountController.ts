import { Request, Response } from "express";
import { api } from "../api";

export async function getAllAccounts(req: Request, res: Response) {
    try {
        let data = await api.get('/Account').then(result => {
            return result.data
        })
        return res.status(201).send(data)
    } catch (error) {
        return res.status(400).json({
            message: error.message || 'Unexpected error.'
        })
    }
}

export async function getAccountById(req: Request, res: Response) {
    try {
        const { id } = req.params
        let data = await api.get(`/Account/${id}`).then(result => {
            return result.data
        })
        return res.status(201).send(data)
    } catch (error) {
        return res.status(400).json({
            message: error.message || 'Unexpected error.'
        })
    }
}