import { Component, OnInit } from '@angular/core';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navdefault',
  templateUrl: './navdefault.component.html',
  styleUrls: ['./navdefault.component.scss'],
})
export class NavdefaultComponent {
  faMoon = faMoon;
  faSun = faSun;

  public isDarkMode = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // get the saved state of the checkbox from local storage
    const checkboxState = localStorage.getItem('isDarkMode');

    // if the state exists, set the isDarkMode variable to the saved state
    if (checkboxState !== null) {
      this.isDarkMode = checkboxState === 'true';
    } else {
      // otherwise, set the isDarkMode variable based on system preferences
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      localStorage.setItem('isDarkMode', String(this.isDarkMode));
    }

    // add or remove the 'dark' class based on the current checkbox state
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  toggleDarkMode() {
    // toggle the isDarkMode variable
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', String(this.isDarkMode));
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  saveCheckboxState() {
    // save the state of the checkbox to local storage
    localStorage.setItem('checkboxState', JSON.stringify(this.isDarkMode));
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
