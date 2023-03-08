import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/userform.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API_SIGNUP: string = 'https://localhost:8081/api/signup';
  /* public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }; */
  public httpOptions = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(private http: HttpClient) {}

  public isLoggedIn() {
    return false;
  }

  public signUp(user: User): Observable<any> {
    const payload = new HttpParams()
      .set('Name', user.Name)
      .set('Password', user.Password);

    return this.http.post<any>(this.API_SIGNUP, payload, this.httpOptions);
  }
}
