import { api } from "../api/api"

export const debitTransactionApi = async (accountOrigin: string, value: number) => {
    return await api.post(`/Account`, {
        accountNumber: accountOrigin,
        value: value,
        type: "Debit"
    })
}

export const creditTransactionApi = async (accountDestination: string, value: number) => {
    return await api.post(`/Account`, {
        accountNumber: accountDestination,
        value: value,
        type: "Credit"
    })
}

export const accountBalanceInquiry = async (accountNumber: string) => {
    const accountData = await api.get(`/Account/${accountNumber}`).then(res => {
        return res.data
    }).catch(err => {
        return err.response
    })

    return accountData
}
