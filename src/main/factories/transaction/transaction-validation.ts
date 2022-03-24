import { Validation } from "../../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { CompareAccountNumber } from "../../../presentation/helpers/validators/compare-account-number";

export const makeTransactionValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['accountOrigin', 'accountDestination', 'value']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareAccountNumber('accountOrigin', 'accountDestination'))

    return new ValidationComposite(validations)
}