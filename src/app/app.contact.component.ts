import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="container mx-auto p-6 text-white">
      <h1 class="text-4xl font-bold mb-6">Contact Me</h1>
      <p class="mb-4">This is the contact page content. Add your contact information here.</p>
    </div>
  `
})
export class ContactComponent {
}