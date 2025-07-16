import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ApiService);

  schoolName: string = '';
  teacherCount: number = 0;
  studentCount: number = 0;

  ngOnInit(): void {
    this.service.getSchoolData().subscribe({
      next: data => {
        this.schoolName = data.school_name;
        this.teacherCount = data.teacher_count;
        this.studentCount = data.student_count;
        console.log(this.schoolName);
      },
      error: err => {
        console.error('Failed to load dashboard data:', err);
      }
    });
  }
}