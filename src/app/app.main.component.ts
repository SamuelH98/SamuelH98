import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';
import { HeaderComponent } from './app.header.component';
import { HomeComponent } from './app.home.component';


@Component({
  selector: 'app-main',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // ✅ Important: let dark mode styles cascade
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgClass,
    HeaderComponent, 
    HomeComponent
  ],
  template: `
    <app-header></app-header>
    <app-home></app-home>
   
  `
})
export class MainComponent {
  
}
