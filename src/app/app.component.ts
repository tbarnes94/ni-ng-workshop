import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{ title }}</h1>
  <app-collection></app-collection>`,
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = 'National Instruments!';
}
