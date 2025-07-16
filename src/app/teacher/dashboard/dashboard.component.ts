import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  // private service = inject(ApiService);

  teacherName = '';
  schoolName = '';
  studentCount = 0;
  constructor(public api:ApiService){}

  ngOnInit(): void {
    this.api.getTeacherDashboard().subscribe({
      next: data => {
        this.teacherName = data.teacher_name;
        this.schoolName = data.school_name;
        this.studentCount = data.student_count;
      },
      error: err => {
        console.error('Error loading dashboard:', err);
        this.router.navigate(['/teacher/login']);
      }
    });
  }

}
