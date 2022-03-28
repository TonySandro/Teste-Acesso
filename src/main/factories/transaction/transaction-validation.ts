import { Validation } from "../../../presentation/helpers/validators/validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite";
import { CompareAccountNumber } from "../../../presentation/helpers/validators/compare-account-number";
import { ConfirmingAccountsExist } from "../../../presentation/helpers/validators/confirming-accounts-exist";
import { AccountValidatorAdapter } from "../../../main/adapters/validators/account-validator-adapter";

export const makeTransactionValidation = (): ValidationComposite => {
    const accountValidatorAdapter = new AccountValidatorAdapter()

    const validations: Validation[] = []
    for (const field of ['accountOrigin', 'accountDestination', 'value']) {
        validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareAccountNumber('accountOrigin', 'accountDestination'))
    validations.push(new ConfirmingAccountsExist('accountOrigin', accountValidatorAdapter))
    validations.push(new ConfirmingAccountsExist('accountDestination', accountValidatorAdapter))

    return new ValidationComposite(validations)
}