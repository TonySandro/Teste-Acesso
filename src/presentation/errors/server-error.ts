export class ServerError extends Error {
    constructor(stack: any) {
        super(`Internal server error`)
        this.message = `ServerError`
        this.stack = stack
    }
}