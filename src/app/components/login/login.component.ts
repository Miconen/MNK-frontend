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
    console.log(this.loginForm.value);
    // TODO: login, auth,reroute to content or profile page
  }
}
