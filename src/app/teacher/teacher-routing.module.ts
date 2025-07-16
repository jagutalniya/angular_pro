import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectTeacher, teacherGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    canActivate: [redirectTeacher]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'students',
    loadComponent: () => import('./students/students.component').then(m => m.StudentsComponent),
    canActivate: [teacherGuard]
  },
  {
    path:'add-student',
    loadComponent: () => import('./add-student/add-student.component').then(m => m.AddStudentComponent),
    canActivate: [teacherGuard]
  },
  {
    path: 'update-student/:id',
    loadComponent: () => import('./update-student/update-student.component').then(m => m.UpdateStudentComponent),
    canActivate: [teacherGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
