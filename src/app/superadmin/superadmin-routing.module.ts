import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectIfLoggedIn, superadminGuard } from '../auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [redirectIfLoggedIn]
  },
  {
    path:'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [superadminGuard]
  },
  {
    path: 'teachers',
    loadComponent: () => import('./teachers/teachers.component').then(m => m.TeachersComponent),
    canActivate: [superadminGuard]
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
    canActivate: [superadminGuard]
  },
  {
    path: 'add-school',
    loadComponent: () => import('./add-school/add-school.component').then(m => m.AddSchoolComponent),
    canActivate: [superadminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
