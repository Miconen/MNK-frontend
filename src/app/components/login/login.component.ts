import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/userform.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public errorMessage = '';
  public loginForm!: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Name: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^[^äö]*$'),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^äö]*$'),
        Validators.minLength(5),
        Validators.maxLength(8),
      ]),
    });
  }

  onLogin() {
    this.errorMessage = '';
    // TODO: login, auth,reroute to content or profile page
    this.authService.login(this.loginForm.value as User).subscribe((res) => {
      console.log(res);

      if (res.status === 'Success') {
        // if login successful
      } else {
        // if login not successful
        // show message to user
        this.errorMessage = res.status;
      }
    });
  }
}
