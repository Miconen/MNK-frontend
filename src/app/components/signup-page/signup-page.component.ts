import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(20),
    ]),
  });

  onCreate() {
    console.log(this.signupForm.value);
    // TODO: create account logic here
  }
}
