import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/userform.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorMessages: string[] = [];
  public loginForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.maxLength(16),
        Validators.pattern('^[^äö]*$'),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^äö]*$'),
        Validators.minLength(5),
        Validators.maxLength(16),
      ]),
    });
  }

  onLogin() {
    this.errorMessages = [];

    // TODO: login, auth,reroute to content or profile page
    this.authService
      .userAccess(this.loginForm.value as User, 'login')
      .subscribe({
        next: (res) => {
          console.log(res);
          // if login successful
          if (res.status === 'Success') {
            this.authService.setUser(res.jwt, this.loginForm.value.Name);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          this.errorMessages = error.error.errors;
          // handle the error here
        },
      });
  }
}
