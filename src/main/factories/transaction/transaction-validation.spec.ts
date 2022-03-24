import { CompareAccountNumber } from "../../../presentation/helpers/validators/compare-account-number"
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation"
import { Validation } from "../../../presentation/helpers/validators/validation"
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite"
import { makeTransactionValidation } from "./transaction-validation"

jest.mock('../../../presentation/helpers/validators/validation-composite')

describe('Transaction validation factory', () => {
    test('Should call ValdiatioComposite with all validations', () => {
        makeTransactionValidation()
        const validations: Validation[] = []

        for (const field of ['accountOrigin', 'accountDestination', 'value']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareAccountNumber('accountOrigin', 'accountDestination'))

        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})
