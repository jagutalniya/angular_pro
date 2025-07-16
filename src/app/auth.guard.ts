import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectIfLoggedIn: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('superadmin');

  if (isLoggedIn) {
    router.navigate(['/superadmin/dashboard']);
    return false;
  }

  return true;
};

export const superadminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('superadmin');

  if (!isLoggedIn) {
    router.navigate(['/superadmin/login']);
    return false;
  }

  return true;
};

export const redirectSchool: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('school');

  if (schoolData) {
    router.navigate(['/school/dashboard']);
    return false;
  }

  return true;
};

export const schoolGuard: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('school');

  if (!schoolData) {
    router.navigate(['/school/login']);
    return false;
  }

  return true;
};


export const redirectTeacher: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('teacher');

  if (schoolData) {
    router.navigate(['/teacher/dashboard']);
    return false;
  }

  return true;
};

export const teacherGuard: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('teacher');

  if (!schoolData) {
    router.navigate(['/teacher/login']);
    return false;
  }

  return true;
};
export const redirectStudent: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('student');

  if (schoolData) {
    router.navigate(['/student/dashboard']);
    return false;
  }

  return true;
};

export const studentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const schoolData = localStorage.getItem('student');

  if (!schoolData) {
    router.navigate(['/student/login']);
    return false;
  }

  return true;
};

