import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'; // Added OnDestroy
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common'; // Added NgIf

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // ✅ Important: let dark mode styles cascade
  imports: [
    RouterLink,
    RouterLinkActive,
    NgFor,
    NgClass,
    NgIf // Import NgIf for conditional cursor
  ],
  template: `
    <div class="typewriter-container">
      <h1>
        {{ displayedTextLine1 }}<span class="cursor" *ngIf="showCursorLine1">|</span>
      </h1>
      <p class="subtitle" *ngIf="line1Completed">
        {{ displayedTextLine2 }}<span class="cursor" *ngIf="showCursorLine2">|</span>
      </p>
    </div>
  `,
  styles: [`
    /* Ensure your global styles (or body style) set a dark background if this component doesn't fill the viewport */
    /* body { background-color: #121212; color: #e0e0e0; } */

    .typewriter-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 80vh; /* Adjust as needed to fill desired space */
      text-align: center;
      font-family: 'Courier New', Courier, monospace; /* Classic typewriter font */
      padding: 20px;
      /* Assuming dark mode - text color will be light */
      color: #e0e0e0; 
    }

    .typewriter-container h1 {
      font-size: clamp(6rem, 5vw, 3.5rem); /* Responsive font size */
      margin-bottom: 0.5rem;
      min-height: 1.2em; /* Prevent layout shift as text types */
      font-weight: bold;
    }

    .typewriter-container .subtitle {
      font-size: clamp(1.2rem, 3vw, 2rem); /* Responsive font size */
      color: #b0b0b0; /* Slightly dimmer for subtitle */
      min-height: 1.2em; /* Prevent layout shift */
      font-weight: normal;
    }

    .cursor {
      display: inline-block;
      animation: blink 0.7s infinite;
      font-weight: bold; /* Make cursor more visible */
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy { // Implemented OnDestroy

  // --- Configuration for Typewriter ---
  private fullTextLine1: string = "Samuel James Hale";
  private fullTextLine2: string = "Software Developer";
  
  public displayedTextLine1: string = "";
  public displayedTextLine2: string = "";

  private typingSpeedMs: number = 120; // Milliseconds per character
  private delayBetweenLinesMs: number = 700; // Milliseconds after line 1 is displayed

  public showCursorLine1: boolean = false; // Line 1 is static, so no typing cursor
  public showCursorLine2: boolean = false; // Will be true when line 2 starts typing
  public line1Completed: boolean = false;

  // private currentIndexLine1: number = 0; // Removed: Not needed for line 1
  private currentIndexLine2: number = 0;

  private timeouts: any[] = []; // To store timeout IDs for cleanup

  constructor() {}

  ngOnInit(): void {
    // Display line 1 immediately
    this.displayedTextLine1 = this.fullTextLine1;
    this.line1Completed = true;
    // this.showCursorLine1 is already false or can be explicitly set to false
    // this.showCursorLine1 = false; // Ensure no cursor for static line 1

    // Prepare for line 2 typing
    this.showCursorLine2 = true; 
    const timeoutId = setTimeout(() => this.startTypingLine2(), this.delayBetweenLinesMs);
    this.timeouts.push(timeoutId);
  }

  // Removed startTypingLine1 method as line 1 is no longer typed

  private startTypingLine2(): void {
    if (this.currentIndexLine2 < this.fullTextLine2.length) {
      this.displayedTextLine2 += this.fullTextLine2.charAt(this.currentIndexLine2);
      this.currentIndexLine2++;
      const timeoutId = setTimeout(() => this.startTypingLine2(), this.typingSpeedMs);
      this.timeouts.push(timeoutId);
    } else {
      // Line 2 (and all typing) finished
      // this.showCursorLine2 = false; // Optionally hide cursor when done
    }
  }

  ngOnDestroy(): void {
    // Clear any pending timeouts when the component is destroyed
    // to prevent memory leaks or errors if navigation happens mid-animation.
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
  }
}