export class InvalidValueError extends Error {
    constructor(paramName: number) {
        super(`Invalid value: ${paramName}`)
        this.message = 'InvalidValueError'
    }
}