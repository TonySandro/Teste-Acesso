export class InsufficientBalanceError extends Error {
    constructor(paramName: number) {
        super(`Insufficient balance: ${paramName}`)
        this.name = 'InsufficientBalanceError'
    }
}