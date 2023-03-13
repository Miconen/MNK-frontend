import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navloggedin',
  templateUrl: './navloggedin.component.html',
  styleUrls: ['./navloggedin.component.scss'],
})
export class NavloggedinComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }
}
