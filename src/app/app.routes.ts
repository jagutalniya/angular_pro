import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { redirectIfLoggedIn, redirectSchool, redirectTeacher, schoolGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [redirectIfLoggedIn, redirectSchool, redirectTeacher]
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [redirectIfLoggedIn, redirectSchool, redirectTeacher]
    },
    {
        path:'contact',
        component: ContactComponent,
        canActivate: [redirectIfLoggedIn, redirectSchool,redirectTeacher]
    },
    {
        path:'superadmin',
        loadChildren: () => import('./superadmin/superadmin.module').then(m => m.SuperadminModule),
    },
    {
        path: 'school',
        loadChildren: () => import('./school/school.module').then(m => m.SchoolModule),
    },
    {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
    },
    {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
    }
];
