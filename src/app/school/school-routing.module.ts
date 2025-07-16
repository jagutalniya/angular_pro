import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectSchool, schoolGuard } from '../auth.guard';

const routes: Routes = [
  {
  path: 'login',
  loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  canActivate: [redirectSchool,]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [schoolGuard]
  },
  {
    path: 'teachers',
    loadComponent: () => import('./teachers/teachers.component').then(m => m.TeachersComponent),
    canActivate: [schoolGuard]
  },
  {
    path: 'add-teacher',
    loadComponent: () => import('./add-teacher/add-teacher.component').then(m => m.AddTeacherComponent),
    canActivate: [schoolGuard]
  },
  {
    path: 'update-teacher/:id',
    loadComponent: () => import('./update-teacher/update-teacher.component').then(m => m.UpdateTeacherComponent),
    canActivate: [schoolGuard]
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
    canActivate: [schoolGuard]
  },
  {
    path: 'update-student/:id',
    loadComponent: () => import('./update-student/update-student.component').then(m => m.UpdateStudentComponent),
    canActivate: [schoolGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolRoutingModule { }
