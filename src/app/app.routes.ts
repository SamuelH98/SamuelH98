import { Routes } from '@angular/router';
import { HomeComponent } from './app.home.component';
import { AboutComponent } from './app.about.component';
import { ContactComponent } from './app.contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];

