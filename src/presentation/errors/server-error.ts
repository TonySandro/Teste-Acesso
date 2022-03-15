export class ServerError extends Error {
    constructor(error?: any) {
        super(`Internal server error`)
        this.name = `ServerError ${error}`
    }
}