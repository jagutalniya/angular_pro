import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  teacherCount = 0;
  studentCount = 0;
  schools: any[] = [];

  constructor(
    private service: ApiService,
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getSuperData().subscribe(res => {
      if (res.success) {
        this.teacherCount = res.teacherCount;
        this.studentCount = res.studentCount;
        this.schools = res.schools;
      }
    });
  }

  deleteSchool(id: number) {
    if (confirm('Are you sure you want to delete this school?')) {
      this.service.deleteSchool(id).subscribe(res => {
        if (res.success) {
          this.schools = this.schools.filter(s => s.id !== id);
        } else {
          alert(res.message || 'Deletion failed');
        }
      });
    }
  }
}