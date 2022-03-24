import { InvalidParamError } from "../../errors";
import { Validation } from "./validation";

export class CompareAccountNumber implements Validation {
    constructor(
        private readonly accountNumberOrigin: string,
        private readonly accountNumberDest: string
    ) {
        this.accountNumberOrigin = accountNumberOrigin
        this.accountNumberDest = accountNumberDest
    }

    validate(input: any): Error {
        if (!input[this.accountNumberOrigin] !== !input[this.accountNumberDest]) {
            return new InvalidParamError('accountDestination to equal accountOrigin')
        }
    }
}