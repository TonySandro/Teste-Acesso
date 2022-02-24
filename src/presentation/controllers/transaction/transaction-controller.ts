export class TransactionController {
    handle(httpRequest: any): any {
        let errorParam = 'accountOrigin'

        if (!httpRequest.body.accountDestination) {
            errorParam = 'accountDestination'
        }
        return {
            statusCode: 400,
            body: new Error(`Missing param: ${errorParam}`)
        }
    }
}