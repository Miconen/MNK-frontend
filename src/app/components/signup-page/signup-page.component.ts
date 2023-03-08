import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/userform.interface';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(private authService: AuthService) {}

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
    /* let user = {
      Id: 10,
      Name: this.signupForm.value.username,
      Password: this.signupForm.value.password,
    }; */
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      console.log(res);
    });
  }
}
