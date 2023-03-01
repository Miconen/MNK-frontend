import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public isLoggedIn() {
    return true;
  }

  constructor() {}
}
