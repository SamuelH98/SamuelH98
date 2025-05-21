import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // ✅ Important: let dark mode styles cascade
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgClass
  ],
  template: `
    <header class="sticky top-0 z-50 w-full py-4 px-6 bg-transparent">
      <div class="flex justify-between items-center">
        <!-- Navigation Items -->
        <div class="flex space-x-5">
          <a
            *ngFor="let item of navItems"
            [routerLink]="item.path"
            routerLinkActive="!bg-gray-200 !text-black dark:!bg-gray-700 dark:!text-white shadow-inner"
            [routerLinkActiveOptions]="{exact: item.path === '/'}"
            class="px-4 py-2 rounded-full font-medium
                   bg-white text-gray-800 shadow-md
                   dark:bg-black dark:text-white dark:shadow-md 
                   transition-all duration-300 
                   hover:bg-gray-100 hover:text-black
                   dark:hover:bg-gray-800 dark:hover:text-white
                   hover:-translate-y-0.5 hover:shadow-xl focus:outline-none hover:shadow-glow"
          >
            {{ item.label }}
          </a>
        </div>
        
        <!-- Dark Mode Toggle -->
        <button 
          (click)="toggleDarkMode()" 
          class="px-4 py-2 rounded-full font-medium
                 bg-white text-gray-800 shadow-md
                 dark:bg-black dark:text-white dark:shadow-md
                 transition-all duration-300 
                 hover:bg-gray-100 hover:text-black
                 dark:hover:bg-gray-800 dark:hover:text-white
                 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none hover:shadow-glow"
        >
          {{ isDarkMode ? '☀️' : '🌙' }}
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];
  
  isDarkMode = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
      if (this.isDarkMode !== savedDarkMode) {
        this.isDarkMode = savedDarkMode;
      }
      this.applyDarkModePreference();
    }
  }
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkModePreference();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
    }
  }

  private applyDarkModePreference() {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (this.isDarkMode) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
}
