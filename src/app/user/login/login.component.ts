import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  showAlert = false;
  alertMsg = 'Please wait! Your account is being created..';
  alertColor = 'blue';
  isSubmitting = false;

  constructor(private authService: AuthService) {}

  login = async () => {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are logging you in..';
    this.alertColor = 'blue';
    this.isSubmitting = true;

    try {
      await this.authService.login(
        this.credentials.email,
        this.credentials.password
      );
    } catch (error) {
      console.error(error);
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'rose';
      this.isSubmitting = false;
      return;
    }

    this.alertMsg = 'Success! Your are now logged in.';
    this.alertColor = 'green';
    this.isSubmitting = false;
  };
}
