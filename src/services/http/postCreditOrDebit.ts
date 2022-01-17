import { api } from "../../api"

export const postCreditOrDebit = async (accountNumber: string, value: number, type: string) => {
    return await api.post(`/Account`, {
        accountNumber: accountNumber,
        value: value,
        type: type
    })
}