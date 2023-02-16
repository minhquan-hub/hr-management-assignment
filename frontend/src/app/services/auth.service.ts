import { login } from './../models/login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: login) {
    this.http
      .post('http://localhost:5001/api/auth', data, { observe: 'response' })
      .subscribe((result) => {
        const user = JSON.stringify(result.body);
        const userData = JSON.parse(user);
        localStorage.setItem('user', user);
        if (userData.role === 'admin' || userData.role === 'leader') {
          this.router.navigate(['/management']);
        } else {
          this.router.navigate(['/member']);
        }
      });
  }
}
