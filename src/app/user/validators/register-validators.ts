import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RegisterValidators {
  // Remember using the this keyword is prohibited in static methods
  // because they do not have access a classes non-static members which need to be instantiated.
  static match(controlName: string, matchingControlName: string) {
    return function (group: AbstractControl): ValidationErrors | null {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        console.error('Form controls cannot be found in the form group.')
        return { controlNotFound: true };
      }

      const error =
        control?.value === matchingControl?.value ? null : { noMatch: true };

      matchingControl.setErrors(error)

      return error;
    };
  }
}
