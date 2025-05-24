import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
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