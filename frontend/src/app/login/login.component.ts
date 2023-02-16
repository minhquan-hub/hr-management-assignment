import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authError: string = '';

  constructor(private auth: AuthService) {}

  login(data: login) {
    this.authError = '';
    this.auth.login(data);
  }
}
