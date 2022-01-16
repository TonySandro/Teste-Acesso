import { Request, Response } from "express";
import { api } from "../api";

async function getMethod(id?: string) {
    try {
        if (!id) id = '';

        let data = await api.get(`/Account/${id}`).then(result => {
            return result.data
        }).catch(err => {
            return err.status(500).json({
                message: err.message || 'Unexpected error.'
            })
        })

        return data
    } catch (error) {
        return error
    }

}

export async function getAllAccounts(req: Request, res: Response) {
    try {
        let data = await getMethod()
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
        let data = await getMethod(id)
        // data = data.find(element => element.accountNumber === id)

        return res.status(201).send(data)
    } catch (error) {
        return res.status(400).json({
            message: error.message || 'Unexpected error.'
        })
    }
}