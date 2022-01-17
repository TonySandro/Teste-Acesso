import { api } from "../../api"

export const getDataByAccountNumber = async (id?: string) => {
    const data = await api.get(`/Account/${id}`).then(result => {
        return result.data
    })
    return data
}