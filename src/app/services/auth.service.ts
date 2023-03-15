import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/userform.interface';
import jwt_decode from 'jwt-decode';
import IJWT from '../types/IJWT';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API_BASE_URL: string = 'https://localhost:8081/api/';
  public httpOptions = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(private http: HttpClient) {}

  public isLoggedIn() {
    const user = localStorage.getItem('auth-key');
    if (user) {
      return true;
    }
    return false;
  }

  // signup and login
  public userAccess(user: User, path: string): Observable<any> {
    const payload = new HttpParams()
      .set('Name', user.Name)
      .set('Password', user.Password);

    return this.http.post<any>(
      this.API_BASE_URL + `${path}`,
      payload,
      this.httpOptions
    );
  }

  // save info to localstorage
  public setUser(token: string, userName: string) {
    localStorage.clear();

    localStorage.setItem('auth-key', token);
    localStorage.setItem('auth-user', userName);
  }

  public logOut() {
    localStorage.clear();
  }

  public getToken() {
    return localStorage.getItem('auth-key') ?? '';
  }

  public getUsername() {
    const token = localStorage.getItem('auth-key') ?? '';
    console.log(jwt_decode<IJWT>(token).Name);
    return jwt_decode<IJWT>(token).Name;
  }
}
