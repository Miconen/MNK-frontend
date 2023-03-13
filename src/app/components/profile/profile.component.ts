import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public userName = 'default user';
  ngOnInit() {
    const name = localStorage.getItem('auth-user');
    if (name) {
      this.userName = name;
    }
  }

  deleteUser() {
    // TODO: delete user logic here
  }
}
