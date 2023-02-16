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
    const role = this.tokenStorageService.getRole();
    if (role) {
      this.isUserLoggedIn.next(true);
      if (role === 'admin' || role === 'leader') {
        this.router.navigate(['/management']);
      } else if (role === 'member') {
        this.router.navigate(['/member']);
      }
    }
  }

  login(data: login) {
    this.http.Post('/auth', data, '').subscribe((data) => {
      const user = JSON.stringify(data);
      const userData = JSON.parse(user);

      if (userData.isSuccess) {
        const { token, role, userName } = userData;
        this.tokenStorageService.saveDataUser(token, role, userName);
        if (role === 'admin' || role === 'leader') {
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
