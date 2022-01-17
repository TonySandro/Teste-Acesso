import { api } from "../../api"

export const getDataByAccountNumber = async (id?: string) => {
    const data = await api.get(`/Account/${id}`).then(result => {
        return result.data
    }).catch(err => {
        console.log(err)
    })
    console.log('Data', data)
    const account = {
        id: data.id,
        accountNumber: data.accountNumber,
        balance: data.balance
    }
    return account
}