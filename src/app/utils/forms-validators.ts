import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export class FormsValidators {
  private static PASSWORD_REGEX = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{6,}$/;

  static validatePassword: ValidatorFn = FormsValidators.validateRegex(FormsValidators.PASSWORD_REGEX)

  static validateRegex(regex: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return regex.test(control.value) ? null : { value: control.value }
    }
  }
}
