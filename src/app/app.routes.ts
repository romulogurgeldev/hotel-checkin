import { Routes } from '@angular/router';
import { PersonRegistrationComponent } from './components/person-registration/person-registration.component';
import { CheckInComponent } from './components/check-in/check-in.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';

export const routes: Routes = [
  { path: 'person-registration', component: PersonRegistrationComponent },
  { path: 'check-in', component: CheckInComponent },
  { path: 'guest-list', component: GuestListComponent },
  { path: '', redirectTo: '/person-registration', pathMatch: 'full' } // Rota padrão
];