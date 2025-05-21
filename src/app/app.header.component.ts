import { Component, OnInit, ViewEncapsulation, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // ✅ Important: let dark mode styles cascade
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor
  ],
  template: `
    <header class="sticky top-0 z-50 w-full py-4 px-6 bg-transparent">
      <div class="flex justify-between items-center">
        <!-- Navigation Items -->
        <div class="flex space-x-5">
          <a
            *ngFor="let item of navItems"
            [routerLink]="item.path"
            routerLinkActive="!bg-[#8F55E6] !text-black dark:!bg-slate-800 dark:!text-white shadow-inner" 
            [routerLinkActiveOptions]="{exact: item.path === '/'}"
            class="px-4 py-2 rounded-full font-medium
             bg-black text-white shadow-md             
             dark:bg-white dark:text-black dark:shadow-md 
             transition-all duration-300
             hover:bg-gray-800 hover:text-white         
             dark:hover:bg-gray-200 dark:hover:text-black 
             hover:-translate-y-0.5 hover:shadow-xl focus:outline-none hover:shadow-glow"
          >
            {{ item.label }}
          </a>
        </div>
        <!-- Dark Mode Toggle -->
        <div class="flex items-center space-x-3">
          
          <button
            (click)="toggleDarkMode()"
            class="px-4 py-2 rounded-full font-medium
             bg-black text-white shadow-md             
             dark:bg-white dark:text-black dark:shadow-md 
             transition-all duration-300
             hover:bg-gray-800 hover:text-white         
             dark:hover:bg-gray-200 dark:hover:text-black 
             hover:-translate-y-0.5 hover:shadow-xl focus:outline-none hover:shadow-glow"
          >
            
            {{isDarkMode ? '☀️' : '🌙' }}
          </button>
        </div>
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
  
  constructor(private renderer: Renderer2) {}
  
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
        this.addBackgroundInversionStyles();
      } else {
        root.classList.remove('dark');
        this.removeBackgroundInversionStyles();
      }
      
      // Add transition class for smooth background changes
      document.body.classList.add('transition-all', 'duration-500');
    }
  }
  
  private addBackgroundInversionStyles() {
    // Create a style element if it doesn't exist
    let styleEl = document.getElementById('bg-inversion-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'bg-inversion-styles';
      document.head.appendChild(styleEl);
    }
    
    // Add CSS to invert background images and black background
    styleEl.textContent = `
      /* Invert the entire page including black background */
      body {
        background-color: white !important;
        filter: invert(1);
      }
      
      /* Don't invert these elements to preserve their colors */
      .no-invert, .no-invert * {
        filter: invert(1); /* Counter-invert to appear normal */
      }
      
      /* Fix images - don't completely invert them */
      img:not(.keep-invert) {
        filter: invert(1); /* Counter-invert */
      }
    `;
  }
  
  private removeBackgroundInversionStyles() {
    const styleEl = document.getElementById('bg-inversion-styles');
    if (styleEl) {
      styleEl.textContent = '';
    }
  }
}
