export class ExternalServerError extends Error {
    constructor() {
        super(`External server error`)
        this.name = `External server error`
    }
}