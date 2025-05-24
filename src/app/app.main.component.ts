import { Component, ViewEncapsulation } from '@angular/core';
import { HomeComponent } from './app.home.component';

@Component({
  selector: 'app-main',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    HomeComponent
  ],
  template: `
    
    <app-home></app-home>
  `
})
export class MainComponent {
}