import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);

  teacherName = '';
  schoolName = '';
  studentCount = 0;

  ngOnInit(): void {
    this.http.get<any>('http://localhost/api/teacher/dashboard.php', { withCredentials: true }).subscribe({
      next: data => {
        this.teacherName = data.teacher_name;
        this.schoolName = data.school_name;
        this.studentCount = data.student_count;
      },
      error: err => {
        console.error(err);
        this.router.navigate(['/teacher/login']);
      }
    });
  }
  logout(){
    localStorage.removeItem('teacher');
    this.router.navigate(['']);
  }
}