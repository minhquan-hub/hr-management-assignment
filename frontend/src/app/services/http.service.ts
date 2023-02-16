import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public Post(url: string, data: any, token: any) {
    return this.http.post(this.baseUrl + url, data, this.addToken(token));
  }

  public Get(url: string, token: any) {
    return this.http.get(this.baseUrl + url, this.addToken(token));
  }

  public Put(url: string, data: any, token: any) {
    return this.http.put(this.baseUrl + url, data, this.addToken(token));
  }

  public Delete(url: string, token: any) {
    return this.http.delete(this.baseUrl + url, this.addToken(token));
  }

  public addToken(token: any) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return { headers: header };
  }
}
