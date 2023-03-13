import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/userform.interface';

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
    console.log(user);
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

  public setUser(token: string, userName: string) {
    localStorage.removeItem('auth-key');
    localStorage.removeItem('auth-user');

    localStorage.setItem('auth-key', token);
    localStorage.setItem('auth-user', userName);
  }
}
