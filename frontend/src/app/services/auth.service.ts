import { TokenStorageService } from './token-storage.service';
import { Auth } from './../models/auth';
import { HttpService } from './http.service';
import { login } from './../models/login';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(
    private http: HttpService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  reloadUser() {
    if (localStorage.getItem('user')) {
      const user = localStorage.getItem('user');
      const userData = user && JSON.parse(user);
      this.isUserLoggedIn.next(true);
      if (userData.role === 'admin' || userData.role === 'leader') {
        this.router.navigate(['/management']);
      } else if (userData.role === 'member') {
        this.router.navigate(['/member']);
      }
    }
  }

  login(data: login) {
    this.http.Post('/auth', data, '').subscribe((result) => {
      const user = JSON.stringify(result);
      const userData = JSON.parse(user);
      if (userData.isSuccess || null) {
        console.log(userData);
        const { token, role, userName } = userData;
        this.tokenStorageService.saveDataUser(token, role, userName);
        if (userData.role === 'admin' || userData.role === 'leader') {
          this.router.navigate(['/management']);
        } else {
          this.router.navigate(['/member']);
        }

        this.isLoginError.emit(true);
      } else {
        this.isLoginError.emit(false);
      }
    });
  }
}
