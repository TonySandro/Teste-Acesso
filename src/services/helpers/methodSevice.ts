import { api } from "../../api"

export const adapterGetByAccountNumber = async (id?: string) => {
    const data = await api.get(`/Account/${id}`).then(result => {
        return result.data
    })
    return data
}