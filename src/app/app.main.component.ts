import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { HeaderComponent } from './app.header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class MainComponent {
}