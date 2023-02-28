import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[A-Za-z][A-Za-z0-9]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z][A-Za-z0-9]*$'),
        Validators.minLength(7),
        Validators.maxLength(20),
      ]),
    });
  }

  onLogin() {
    console.log(this.loginForm.value);
    // TODO: login, auth,reroute to content or profile page
  }
}
