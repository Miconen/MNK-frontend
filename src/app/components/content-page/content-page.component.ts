import { Component } from '@angular/core';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent {
  data: string[] = [];
  i = 1;

  ngOnInit(): void {
    for (let index = 0; index < 19; index++) {
      this.data.push('Recents' + this.i);
      this.i++;
    }
  }

  onScroll(): void {
    if (this.i > 100) {
      return;
    }
    for (let index = 0; index < 19; index++) {
      this.data.push('Recents' + this.i);
      this.i++;
    }
  }
}
