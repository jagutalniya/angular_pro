import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  private router = inject(Router);
  private service = inject(ApiService);

  students: any[] = [];
  teacherName = '';
  search = '';
  page = 1;
  totalPages = 1;
  message = '';

  ngOnInit() {
    this.fetchDashboard();
  }

  fetchDashboard() {
    this.service.getTeacherName().subscribe({
      next: data => {
        this.teacherName = data.teacher_name;
        this.fetchStudents();
      },
      error: () => this.router.navigate(['/teacher/login']),
    });
  }

  fetchStudents() {
    this.service.getStudentsTeacher(this.page, this.search).subscribe({
      next: res => {
        this.students = res.students;
        this.totalPages = res.total_pages;
        this.page = res.current_page;
      },
      error: err => {
        console.error(err);
        this.message = 'Failed to fetch students';
      }
    });
  }

  onSearch() {
    this.page = 1;
    this.fetchStudents();
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure to delete this student?')) {
      this.service.deleteStudent(id).subscribe({
        next: () => {
          alert('Deleted successfully');
          this.fetchStudents();
        },
        error: err => {
          console.error(err);
          alert('Delete failed');
        }
      });
    }
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
      this.fetchStudents();
    }
  }
}