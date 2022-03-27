import { InvalidParamError } from "../../errors";
import { Validation } from "./validation";

export class CompareAccountNumber implements Validation {
    constructor(
        private readonly accountOrigin: string,
        private readonly accountDestination: string
    ) {
        this.accountOrigin = accountOrigin
        this.accountDestination = accountDestination
    }

    validate(input: any): Error {
        if (input[this.accountOrigin] === input[this.accountDestination]) {
            return new InvalidParamError('accountDestination to equal accountOrigin')
        }
    }
}