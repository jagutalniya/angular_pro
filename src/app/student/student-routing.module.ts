import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectStudent, studentGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [redirectStudent]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [studentGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
