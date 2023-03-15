import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types/userform.interface';
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

    constructor(private http: HttpClient) { }

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
        localStorage.removeItem('auth-key');
        localStorage.setItem('auth-key', token);
    }

    public logOut() {
        localStorage.removeItem('auth-key');
    }

    public getToken() {
        return localStorage.getItem('auth-key') ?? '';
    }

    public getUsername() {
        const token = this.getToken();
        if (!token) return "";
        const payload = this.decodeJWT(token).payload as IJWT;
        return payload.unique_name;
    }

    public getRole() {
        const token = this.getToken();
        if (!token) return "guest";
        const payload = this.decodeJWT(token).payload as IJWT;
        return payload.role;
    }

    private decodeJWT(token: string) {
        var arr = token.split('.');
        return { header: JSON.parse(atob(arr[0])), payload: JSON.parse(atob(arr[1])), secret: arr[2] }
    }
}
