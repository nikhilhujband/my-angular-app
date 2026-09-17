import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  login(): void {

    if (this.username === 'admin' && this.password === '12345') {

      // Correct credentials
      this.errorMessage = '';
      this.authService.login();
      this.router.navigate(['/home']);

    } else {

      // Wrong credentials
      this.errorMessage = 'Wrong username or password';

    }
  }
}