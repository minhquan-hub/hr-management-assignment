import { Injectable } from '@angular/core';
import { localStorageKey } from '../models/enum/local-storage-key';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  logOut(): void {
    localStorage.clear();
  }

  public saveDataUser(token: string, role: string, userName: string) {
    localStorage.removeItem(localStorageKey.TOKEN);
    localStorage.removeItem(localStorageKey.ROLE);
    localStorage.removeItem(localStorageKey.USERNAME);
    localStorage.setItem(localStorageKey.TOKEN, token);
    localStorage.setItem(localStorageKey.ROLE, role);
    localStorage.setItem(localStorageKey.USERNAME, userName);
  }

  public getToken(): string | null {
    return localStorage.getItem(localStorageKey.TOKEN);
  }

  public getRole(): string | null {
    return localStorage.getItem(localStorageKey.ROLE);
  }

  public getUserName(): string | null {
    return localStorage.getItem(localStorageKey.USERNAME);
  }
}
