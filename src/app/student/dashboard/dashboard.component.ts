import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private service = inject(ApiService);
  private router = inject(Router);

  student: any = {};

  ngOnInit(): void {
    this.service.getStudentDashboard().subscribe({
        next: data => {
          if (data.error) {
            alert(data.error);
            this.router.navigate(['/student/login']);
          } else {
            this.student = data;
          }
        },
        error: () => {
          alert('Failed to fetch student info');
          this.router.navigate(['/student/login']);
        }
      });
  }

}
