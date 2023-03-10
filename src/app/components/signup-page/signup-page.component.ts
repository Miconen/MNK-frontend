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
  public errorMessages: string[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
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

  onCreate() {
    this.errorMessages = [];

    this.authService
      .userAccess(this.signupForm.value as User, 'signup')
      .subscribe((res) => {
        console.log(res);
        if (res.status === 'Success') {
          // if signup successful
        } else {
          // if signup not successful
          // show message to user
          this.errorMessages = res.errors;
        }
      });
  }
}
