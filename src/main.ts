import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MainComponent } from './app/app.main.component';


bootstrapApplication(MainComponent,  appConfig)
  .catch((err) => console.error(err));
