import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

 {
  path: 'home',
  component: HomeComponent,
  canActivate: [authGuard]
 },

  {
  path: 'about',
  loadComponent: () =>
    import('./about/about.component')
      .then(m => m.AboutComponent)
  },

  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: '**',
    redirectTo: 'employee'
  }
];