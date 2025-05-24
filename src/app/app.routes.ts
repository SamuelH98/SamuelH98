import { Routes } from '@angular/router';
import { HomeComponent } from './app.home.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];

