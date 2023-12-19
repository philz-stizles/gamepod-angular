import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IUser from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RegisterValidators } from '../validators/register-validators';
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate]
  );
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(100),
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      phoneNumber: this.phoneNumber,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created..';
  alertColor = 'blue';
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private emailTaken: EmailTaken
  ) {}

  register = async () => {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created..';
    this.alertColor = 'blue';
    this.isSubmitting = true;

    try {
      // Register new user.
      await this.authService.createUser(this.registerForm.value as IUser);
    } catch (error: any) {
      console.error(error.message);
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'rose';
      this.isSubmitting = false;
      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
    this.isSubmitting = false;
  };
}
