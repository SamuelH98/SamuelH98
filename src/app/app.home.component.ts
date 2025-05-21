import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'; // Added OnDestroy
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common'; // Added NgIf

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // ✅ Important: let dark mode styles cascade
  imports: [
    NgIf // Import NgIf for conditional cursor
  ],
  template: `
    <!-- 
      Ensure your global styles (e.g., in styles.css or on the body tag in index.html) 
      set a dark background if this component doesn't fill the viewport.
      Example for body: <body class="bg-gray-900 text-gray-200">
    -->
    <div class="flex flex-col justify-center items-center min-h-[80vh] text-center font-mono p-5 text-gray-200">
      <h1 class="text-[clamp(3.5rem,5vw,6rem)] mb-2 min-h-[1.2em] font-bold">
        {{ displayedTextLine1 }}<span class="inline-block animate-blink font-bold" *ngIf="showCursorLine1">|</span>
      </h1>
      <p 
        class="text-[clamp(1.2rem,3vw,2rem)] text-gray-400 min-h-[1.2em] font-normal" 
        *ngIf="line1Completed">
        {{ displayedTextLine2 }}<span class="inline-block animate-blink font-bold" *ngIf="showCursorLine2">|</span>
      </p>
    </div>
  `,
  // styles array has been removed
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

  private currentIndexLine2: number = 0;

  private timeouts: any[] = []; // To store timeout IDs for cleanup

  constructor() {}

  ngOnInit(): void {
    // Display line 1 immediately
    this.displayedTextLine1 = this.fullTextLine1;
    this.line1Completed = true;
    // this.showCursorLine1 is already false

    // Prepare for line 2 typing
    this.showCursorLine2 = true; 
    const timeoutId = setTimeout(() => this.startTypingLine2(), this.delayBetweenLinesMs);
    this.timeouts.push(timeoutId);
  }

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
    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
  }
}