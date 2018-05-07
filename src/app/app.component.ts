import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>
  <app-collection></app-collection>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'National Instruments!';
}
