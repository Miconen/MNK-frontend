import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/userform.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public ENDPOINT: string = 'https://localhost:8081/api/signup';
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  public isLoggedIn() {
    return false;
  }

  public signUp(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.ENDPOINT, user, this.httpOptions);
  }
}
