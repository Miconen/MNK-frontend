import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  public signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[^äö]*$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^[^äö]*$'),
        Validators.minLength(7),
        Validators.maxLength(20),
      ]),
    });
  }

  onCreate() {
    console.log(this.signupForm.value);
    // TODO: create account logic here
  }
}
