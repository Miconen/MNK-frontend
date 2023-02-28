import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  saveChangesForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  onSaveChanges() {
    console.log(this.saveChangesForm.value);
    // TODO:
    // if new username or new password is valid then
    // do PUT request to api and update old values with new values
    // in database.
  }
}
