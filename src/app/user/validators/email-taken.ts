import { AuthService } from 'src/app/services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
}) // annotate with @Injectable to enable AuthService injection in a normal class
// @Injectable will also enable you inject this class into other classes
export class EmailTaken implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = async (
    control: AbstractControl
  ): Promise<ValidationErrors | null> => {
    const response = await this.authService.emailExists(control.value);

    return response.length ? { emailExists: true } : null;
  };
}
