import { ServerError } from "../../errors"
import { HttpResponse } from "../../protocols/http"

export const badRequest = (error: Error): HttpResponse => {
    return {
        statusCode: 400,
        body: {
            Status: "Error",
            Message: error
        }
    }
}

export const serverError = (error?: any): HttpResponse => {
    return {
        statusCode: 500,
        body: {
            Status: "Error",
            Message: new ServerError(error)
        }
    }
}

export const success = (data: any): HttpResponse => {
    return {
        statusCode: 200,
        body: {
            transactionId: data.transactionId,
            Status: "Confirmed"
        }
    }
}