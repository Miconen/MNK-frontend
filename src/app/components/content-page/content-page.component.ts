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
    for (let index = 0; index < 50; index++) {
      this.data.push('Dummydata' + this.i);
      this.i++;
    }
  }

  onScroll(): void {
    for (let index = 0; index < 50; index++) {
      this.data.push('Dummydata' + this.i);
      this.i++;
    }
  }
}
