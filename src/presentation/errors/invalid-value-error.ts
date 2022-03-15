export class InvalidValueError extends Error {
    constructor(paramName: number) {
        super(`Invalid value: ${paramName}`)
        this.name = 'InvalidValueError'
    }
}