import { api } from "../../api"

export const getDataByAccountNumber = async (id?: string) => {
    let status = 400
    const data = await api.get(`/Account/${id}`).then(result => {
        status = 200
        return result.data
    })

    const account = {
        id: data.id,
        accountNumber: data.accountNumber,
        balance: data.balance,
        status: status
    }
    return account
}