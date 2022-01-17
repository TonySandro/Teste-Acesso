import { api } from "../../api"

export const postCreditOrDebit = async (accountOrigin: string, accountDestination: string, value: number) => {
    try {
        let debit = api.post(`/Account`, {
            accountNumber: accountOrigin,
            value: value,
            type: "Debit"
        })

        let credit = await api.post(`/Account`, {
            accountNumber: accountDestination,
            value: value,
            type: "Credit"
        })
        Promise.all([credit, debit])
    } catch (error) {
        return error
    }


}