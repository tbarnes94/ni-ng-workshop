import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<h3>{{ pageTitle}}</h3>
            <p>Welcome to your personal library</p>`,
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public pageTitle: string = "About Me"

  constructor() { }

  ngOnInit() {
  }

}
